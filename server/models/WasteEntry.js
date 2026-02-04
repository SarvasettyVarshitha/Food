const mongoose = require('mongoose');

const WasteEntrySchema = new mongoose.Schema({
    date: {
        type: String, // YYYY-MM-DD
        required: true
    },
    mealType: {
        type: String,
        enum: ['Breakfast', 'Lunch', 'Dinner'],
        required: true
    },
    quantity: {
        type: Number, // in kg or servings
        required: true
    },
    reason: {
        type: String,
        enum: ['OVERCOOKED', 'UNDERCOOKED', 'SPILLED', 'EXPIRED', 'LEFTOVER', 'Other'],
        default: 'LEFTOVER'
    },
    photoUrl: {
        type: String, // Path to uploaded file
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('WasteEntry', WasteEntrySchema);
