const mongoose = require('mongoose');
const Movie = require('./models/Movie');
const News = require('./models/News');
const Celebrity = require('./models/Celebrity');
const Video = require('./models/Video');
const User = require('./models/User');
const Widget = require('./models/Widget');
require('dotenv').config();

const widgets = [
    {
        type: 'weather',
        data: {
            city: 'Panchkula',
            temp: 24,
            condition: 'MODERATE',
            warning: 'Thunderstorm warning'
        }
    },
    {
        type: 'market',
        data: [
            { name: 'NIFTY', symbol: 'NIFTY', change: '+0.06%', price: '23,165.60', up: true },
            { name: 'SENSEX', symbol: 'SENSEX', change: '+0.12%', price: '74,654.04', up: true },
            { name: 'Gold', symbol: 'Gold', change: '-1.04%', price: '5,009.20', up: false },
            { name: 'Silver', symbol: 'Silver', change: '-1.93%', price: '79.78', up: false, dropping: true },
        ]
    },
    {
        type: 'cricket',
        data: {
            title: 'ICC Champions Trophy',
            matches: [
                {
                    team1: { name: 'IND', flag: 'in', score: '352/4', overs: '50.0' },
                    team2: { name: 'AUS', flag: 'au', score: '312', overs: '48.2' },
                    result: 'IND won by 40 runs'
                },
                {
                    team1: { name: 'ENG', flag: 'gb' },
                    team2: { name: 'NZ', flag: 'nz' },
                    date: '18 Mar',
                    time: '2:30 pm',
                    venue: 'The Oval, London'
                }
            ]
        }
    }
];

const movies = [
    { 
        title: "Mastaney 2", 
        image: "https://images.unsplash.com/photo-1595769812725-4c6564f7046c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        rating: 8.5, 
        genre: "Action", 
        year: 2025,
        overview: "The legendary Mastanas return in this high-octane sequel, fighting for justice and honor in a changing world.",
        director: "Simranveer Singh",
        runtime: "2h 45m",
        certification: "U/A",
        performance: { day1: "₹12 Crore", weekend: "₹45 Crore", status: "SUPER HIT" },
        industry: "Pollywood",
        fullStory: "<h3>The Saga Continues</h3><p>After the massive success of the first part, <strong>Mastaney 2</strong> takes the storytelling to a whole new level. The film explores the <em>bravery and sacrifice</em> of the Sikh warriors in the 18th century.</p><ul><li>Breathtaking Action Sequences</li><li>Soulful Music</li><li>Powerful Performances</li></ul>"
    },
    { 
        title: "Dune: Part Three", 
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        rating: 9.2, 
        genre: "Sci-Fi", 
        year: 2026,
        overview: "Paul Atreides continues his journey as he leads the Fremen in a war to reclaim Arrakis.",
        director: "Denis Villeneuve",
        runtime: "3h 10m",
        certification: "U/A",
        performance: { day1: "$100 Million", weekend: "$250 Million", status: "BLOCKBUSTER" },
        industry: "Hollywood",
        fullStory: "<p>The epic conclusion to the Dune trilogy. Paul Atreides must choose between the love of his life and the fate of the known universe.</p>"
    },
    { 
        title: "Pathaan 2", 
        image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        rating: 8.1, 
        genre: "Action/Thriller", 
        year: 2025,
        overview: "Pathaan is back for another mission to save the nation from a new global threat.",
        director: "Siddharth Anand",
        runtime: "2h 50m",
        certification: "U/A",
        performance: { day1: "₹55 Crore", weekend: "₹210 Crore", status: "SUPER HIT" },
        industry: "Bollywood",
        fullStory: "<p>Shah Rukh Khan returns as the legendary spy Pathaan in this high-octane sequel that takes the action across five continents.</p>"
    },
    { 
        title: "Carry On Jatta 3", 
        image: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        rating: 8.9, 
        genre: "Comedy", 
        year: 2025,
        overview: "The confusion reaches new heights as the Jatta family returns for more hilarious misunderstandings.",
        director: "Smeep Kang",
        runtime: "2h 20m",
        certification: "U",
        performance: { day1: "₹15 Crore", weekend: "₹55 Crore", status: "BLOCKBUSTER" },
        industry: "Pollywood",
        fullStory: "<p>The hit comedy franchise is back! Join the Jatta family for another round of <strong>insane confusion</strong> and laughter.</p>"
    }
];

const news = [
    { title: "Diljit Dosanjh to Perform at Coachella 2026", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "EXCLUSIVE", excerpt: "Punjabi superstar Diljit Dosanjh has been confirmed as one of the performers at Coachella Valley Music and Arts Festival 2026.", date: "2 hours ago", author: "Gurpreet Singh" },
    { title: "Tom Cruise Spotted in Mumbai for M:I 8 Shoot", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "HOLLYWOOD", excerpt: "Tom Cruise was seen at Gateway of India filming a high-voltage chase sequence for Mission Impossible 8.", date: "1 hour ago", author: "Editor Team" },
    { title: "Pollywood Box Office: Mastaney 2 Breaks Records", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "POLLEYWOOD", excerpt: "The highly anticipated sequel Mastaney 2 has shattered all previous opening weekend records in Punjab.", date: "6 hours ago", author: "Maninder Kaur" },
    { title: "Shah Rukh Khan Announces New Project with Atlee", image: "https://images.unsplash.com/photo-1496337589254-7e19d01ced44?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", category: "BOLLYWOOD", excerpt: "The Jawan duo is back! SRK and Atlee have officially announced their next collaboration for 2026.", date: "3 hours ago", author: "Editor Team" }
];

const celebrities = [
    { 
        name: "Diljit Dosanjh", 
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        role: "Singer/Actor", 
        bio: "International Punjabi superstar with millions of fans worldwide.",
        fullBio: "<p>Diljit Dosanjh is a <strong>powerhouse of talent</strong>.</p>",
        milestones: [{ year: '2026', text: 'Coachella Main Stage Performer' }],
        stats: { fanBase: '15M+', tours: '20+ Nations', impactScore: '99%' },
        industry: "Pollywood",
        category: "Singer"
    },
    { 
        name: "Cillian Murphy", 
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        role: "Actor", 
        bio: "Oscar-winning actor known for his roles in Oppenheimer and Peaky Blinders.",
        fullBio: "<p>Cillian Murphy is one of the most versatile actors of his generation.</p>",
        milestones: [{ year: '2024', text: 'Academy Award for Best Actor' }],
        stats: { fanBase: '20M+', tours: 'Global Press', impactScore: '98%' },
        industry: "Hollywood",
        category: "Actor"
    },
    { 
        name: "Deepika Padukone", 
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        role: "Actor/Producer", 
        bio: "One of the highest-paid actresses in India, known for her global impact.",
        fullBio: "<p>Deepika has successfully transitioned from Bollywood to global stardom.</p>",
        milestones: [{ year: '2025', text: 'Global Brand Ambassador' }],
        stats: { fanBase: '75M+', tours: 'Global Events', impactScore: '97%' },
        industry: "Bollywood",
        category: "Actor"
    }
];

const videos = [
    { 
        title: "Purane Yaar: Official Trailer", 
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
        videoType: "youtube", 
        views: "2.4M", 
        time: "3:45",
        description: "<p>Watch the official trailer of <strong>Purane Yaar</strong>.</p>",
        publishedAt: "15 March 2026",
        industry: "Pollywood",
        category: "Trailer"
    },
    { 
        title: "Mission Impossible 8: Teaser", 
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80", 
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", 
        videoType: "youtube", 
        views: "45M", 
        time: "2:15",
        description: "<p>Tom Cruise returns for his most dangerous mission yet.</p>",
        publishedAt: "18 March 2026",
        industry: "Hollywood",
        category: "Trailer"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Movie.deleteMany({});
        await News.deleteMany({});
        await Celebrity.deleteMany({});
        await Video.deleteMany({});
        await User.deleteMany({});
        await Widget.deleteMany({});

        await Movie.insertMany(movies);
        await News.insertMany(news);
        await Celebrity.insertMany(celebrities);
        await Video.insertMany(videos);
        await Widget.insertMany(widgets);

        // Seed initial admin user with full privileges
        await User.create({
            username: 'punjabi_admin',
            email: 'admin@punjabifilmnews.com',
            fullName: 'Punjabi Admin',
            password: 'admin_strong_123',
            role: 'admin'
        });

        console.log('Database seeded successfully, including admin user!');
        process.exit();
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
};

seedDB();

