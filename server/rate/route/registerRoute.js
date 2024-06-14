const express = require('express');
const Registration = require('../models/RegistrationModel');

const router = express.Router();

// GET all registrations
router.get('/', async (req, res) => {
  try {
    const allRegistrations = await Registration.find();
    res.json(allRegistrations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new registration
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if all required fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new registration instance
    const registration = new Registration({
      username: username,
      email: email,
      password: password
    });

    // Save the registration to the database
    const newRegistration = await registration.save();

    // Respond with the newly created registration
    res.status(201).json(newRegistration);
  } catch (err) {
    // Handle errors
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
