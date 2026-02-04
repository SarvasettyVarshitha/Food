const express = require('express');
const router = express.Router();
const WasteEntry = require('../models/WasteEntry');
const multer = require('multer');
const path = require('path');

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// POST /waste - Save waste entry with Photo
router.post('/waste', upload.single('photo'), async (req, res) => {
    try {
        const { date, mealType, quantity, reason } = req.body;
        let photoUrl = '';

        if (req.file) {
            photoUrl = `/uploads/${req.file.filename}`;
        }

        // Validate required fields explicitly if needed, but mongoose helps too
        // Note: quantity comes as string in FormData, need to parse if not handled automatically

        const newWaste = new WasteEntry({
            date,
            mealType,
            quantity: Number(quantity),
            reason,
            photoUrl
        });

        await newWaste.save();
        res.status(201).json({ message: 'Waste entry saved successfully', data: newWaste });
    } catch (error) {
        console.error('Error saving waste:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /analytics - Get totals (Removed MealSelection)
router.get('/analytics', async (req, res) => {
    try {
        const wasteEntries = await WasteEntry.find().sort({ date: -1 });

        const totalWaste = wasteEntries.reduce((acc, curr) => acc + curr.quantity, 0);

        res.json({
            totalWasteKg: totalWaste,
            wasteEntries: wasteEntries.length,
            recentEntries: wasteEntries.slice(0, 5) // Send recent entries for display maybe?
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
