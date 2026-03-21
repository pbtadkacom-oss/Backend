const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity');
const { upload } = require('../config/cloudinary');

// Helper to enrich with isLiked status for comments
const enrich = (items, sessionUser) => {
    const userId = sessionUser ? sessionUser.id : null;
    return items.map(item => {
        const itemObj = item.toObject();
        if (itemObj.comments) {
            itemObj.comments = itemObj.comments.map(comment => ({
                ...comment,
                isLiked: userId && comment.likedBy ? comment.likedBy.includes(userId) : false
            }));
        }
        return itemObj;
    });
};

router.get('/', async (req, res) => {
    try {
        const isAdmin = req.session.user && (req.session.user.role === 'admin' || req.session.user.role === 'sub-admin');
        let query = Celebrity.find();
        
        if (isAdmin) {
            query = query.populate('createdBy', 'username employeeId fullName');
        }
        
        const celebrities = await query.sort({ createdAt: -1 });
        res.json(enrich(celebrities, req.session.user));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const celebData = { ...req.body };
    if (req.file) {
        celebData.image = req.file.path;
    }
    if (req.session.user) {
        celebData.createdBy = req.session.user.id;
    }
    const celeb = new Celebrity(celebData);
    try {
        const newCeleb = await celeb.save();
        res.status(201).json(newCeleb);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', upload.single('image'), async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.image = req.file.path;
        }
        if (req.session.user) {
            updateData.createdBy = req.session.user.id;
        }
        const updatedCeleb = await Celebrity.findByIdAndUpdate(req.params.id, updateData, { new: true })
            .populate('createdBy', 'username employeeId fullName');
        if (!updatedCeleb) return res.status(404).json({ message: 'Celebrity not found' });
        res.json(enrich([updatedCeleb], req.session.user)[0]);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a celebrity
router.delete('/:id', async (req, res) => {
    try {
        const celeb = await Celebrity.findByIdAndDelete(req.params.id);
        if (!celeb) return res.status(404).json({ message: 'Celebrity not found' });
        res.json({ message: 'Celebrity deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Comment Routes
router.post('/:id/comments', async (req, res) => {
    try {
        const celeb = await Celebrity.findById(req.params.id);
        if (!celeb) return res.status(404).json({ message: 'Celebrity not found' });
        celeb.comments.push(req.body);
        const updatedCeleb = await celeb.save();
        res.status(201).json(enrich([updatedCeleb], req.session.user)[0]);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id/comments/:commentId', async (req, res) => {
    try {
        const celeb = await Celebrity.findById(req.params.id);
        if (!celeb) return res.status(404).json({ message: 'Celebrity not found' });
        
        const comment = celeb.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        const isAuthor = req.session.user && req.session.user.username === comment.user;
        const isAdmin = req.session.user && (req.session.user.role === 'admin' || req.session.user.role === 'sub-admin');
        
        if (!isAuthor && !isAdmin) {
            return res.status(403).json({ message: 'Unauthorized to delete this comment' });
        }

        celeb.comments = celeb.comments.filter(c => c._id.toString() !== req.params.commentId);
        await celeb.save();
        res.json(enrich([celeb], req.session.user)[0]);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/:id/comments/:commentId/like', async (req, res) => {
    try {
        const celeb = await Celebrity.findById(req.params.id);
        if (!celeb) return res.status(404).json({ message: 'Celebrity not found' });

        const comment = celeb.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        if (!req.session.user) return res.status(401).json({ message: 'Login required' });
        const userId = req.session.user.id;
        
        if (!comment.likedBy) comment.likedBy = [];
        if (comment.likedBy.includes(userId)) {
            comment.likedBy = comment.likedBy.filter(id => id !== userId);
            comment.likes = Math.max(0, (comment.likes || 1) - 1);
        } else {
            comment.likedBy.push(userId);
            comment.likes = (comment.likes || 0) + 1;
        }
        await celeb.save();
        res.json(enrich([celeb], req.session.user)[0]);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/:id/comments/:commentId', async (req, res) => {
    try {
        const celeb = await Celebrity.findById(req.params.id);
        if (!celeb) return res.status(404).json({ message: 'Celebrity not found' });
        
        const comment = celeb.comments.id(req.params.commentId);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        const isAuthor = req.session.user && req.session.user.username === comment.user;
        const isAdmin = req.session.user && (req.session.user.role === 'admin' || req.session.user.role === 'sub-admin');
        
        // If updating content, only author can do it
        if (req.body.content !== undefined && !isAuthor) {
             return res.status(403).json({ message: 'Only the author can edit comment content' });
        }
        
        // If updating likes (admin override), only admin can do it
        if (req.body.likes !== undefined && !isAdmin) {
             return res.status(403).json({ message: 'Only admins can override likes' });
        }

        if (req.body.likes !== undefined) comment.likes = req.body.likes;
        if (req.body.content !== undefined) comment.content = req.body.content;
        
        await celeb.save();
        res.json(enrich([celeb], req.session.user)[0]);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
