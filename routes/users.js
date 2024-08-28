const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as necessary

// GET users with search and role filter
router.get('/', async (req, res) => {
    try {
        const { search, role } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { firstName: new RegExp(search, 'i') },
                { lastName: new RegExp(search, 'i') },
                { email: new RegExp(search, 'i') },
                { mobileNo: new RegExp(search, 'i') },
            ];
        }

        if (role) {
            query.role = role;
        }

        const users = await User.find(query);
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
