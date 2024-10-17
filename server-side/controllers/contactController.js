// controllers/contactController.js
const Contact = require('../models/Contact');

// POST: Create new contact
exports.createContact = async (req, res) => {
    try {
        const { firstname, lastname, email, query } = req.body;
        const newContact = new Contact({ firstname, lastname, email, query });
        await newContact.save();
        res.status(201).json({ message: 'Contact saved successfully', data: newContact });
    } catch (err) {
        res.status(500).json({ message: 'Failed to save contact', error: err });
    }
};

// GET: Fetch all contacts
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch contacts', error: err });
    }
};
