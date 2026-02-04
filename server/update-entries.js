const mongoose = require('mongoose');
const WasteEntry = require('./models/WasteEntry');
require('dotenv').config();

async function updateEntries() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Update entries for specific dates to OVERCOOKED
        const result1 = await WasteEntry.updateMany(
            { date: '2026-01-29' },
            { $set: { reason: 'OVERCOOKED' } }
        );

        const result2 = await WasteEntry.updateMany(
            { date: '2026-01-27' },
            { $set: { reason: 'OVERCOOKED' } }
        );

        console.log(`Updated ${result1.modifiedCount} entries for 2026-01-29 to OVERCOOKED`);
        console.log(`Updated ${result2.modifiedCount} entries for 2026-01-27 to OVERCOOKED`);

        await mongoose.disconnect();
        console.log('Database updated successfully');
    } catch (error) {
        console.error('Error updating entries:', error);
    }
}

updateEntries();