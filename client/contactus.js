// contactus.js

// Base URL of your backend server (adjust if needed)
const API_URL = 'http://localhost:5000/api';

// Handle form submission (POST request)
document.getElementById('contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent the form from reloading the page

    // Get form values
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const query = document.getElementById('query').value;

    // Create the contact data object
    const contactData = {
        firstname,
        lastname,
        email,
        query
    };

    try {
        // Send POST request to submit the query
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Your query has been submitted successfully.');
            document.getElementById('contactForm').reset();  // Reset form after submission
            loadContacts();  // Reload the contact list
        } else {
            alert('Failed to submit your query.');
        }
    } catch (error) {
        console.error('Error submitting query:', error);
        alert('An error occurred. Please try again later.');
    }
});

// Load the contacts when the page loads
document.addEventListener('DOMContentLoaded', loadContacts);
