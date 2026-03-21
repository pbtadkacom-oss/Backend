const mongoose = require('mongoose');

const CelebritySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    fullBio: { type: String },
    milestones: [
        { year: { type: String }, text: { type: String } }
    ],
    stats: {
        fanBase: { type: String },
        tours: { type: String },
        impactScore: { type: String }
    },
    industry: { type: String, default: 'Pollywood' },
    category: { type: String, default: 'Actor' },
    comments: [{
        user: { type: String, required: true },
        content: { type: String, required: true },
        likes: { type: Number, default: 0 },
        likedBy: [{ type: String }],
        reports: [{ type: String }],
        createdAt: { type: Date, default: Date.now }
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Celebrity', CelebritySchema);
