const mongoose = require('mongoose');
const dotenv = require('dotenv');
const WasteEntry = require('./models/WasteEntry');

dotenv.config();

const sampleData = [
    {
        date: '2026-02-01',
        mealType: 'Dinner',
        quantity: 2.2,
        reason: 'OVERCOOKED',
        photoUrl: ''
    },
    {
        date: '2026-01-29',
        mealType: 'Dinner',
        quantity: 4.5,
        reason: 'OVERCOOKED',
        photoUrl: ''
    },
    {
        date: '2026-01-28',
        mealType: 'Lunch',
        quantity: 15.5,
        reason: 'LEFTOVER',
        photoUrl: ''
    },
    {
        date: '2026-01-27',
        mealType: 'Breakfast',
        quantity: 3.0,
        reason: 'OVERCOOKED',
        photoUrl: ''
    },
    {
        date: '2026-01-26',
        mealType: 'Dinner',
        quantity: 8.2,
        reason: 'LEFTOVER',
        photoUrl: ''
    }
];

const seedDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('Error: MONGODB_URI is missing in .env');
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data (optional, but good for clean seed)
        await WasteEntry.deleteMany({});
        console.log('Cleared existing waste entries');

        await WasteEntry.insertMany(sampleData);
        console.log('Sample data inserted successfully');

        mongoose.connection.close();
        console.log('Connection closed');
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
