const socket = io('http://localhost:5000'); // Connect to the backend server
const form = document.getElementById('form');
const input = document.getElementById('input');
const usernameInput = document.getElementById('username');
const messages = document.getElementById('messages');

const chatbox = document.getElementById('chatbox');
const chatBody = document.getElementById('chat-body');
const chatFooter = document.getElementById('chat-footer');
const toggleButton = document.getElementById('toggle-button');

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (input.value && usernameInput.value) {
        socket.emit('chat message', {
            username: usernameInput.value,
            message: input.value
        });
        input.value = '';
    }
});

// Display chat message
socket.on('chat message', function(data) {
    const item = document.createElement('li');
    item.innerHTML = `<strong>${data.username}</strong>: ${data.message}`; // Display username with message
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight; // Keep chat at bottom
});

// Handle chatbox minimize/maximize
toggleButton.addEventListener('click', function() {
    if (chatBody.style.display === 'none') {
        chatBody.style.display = 'flex';
        chatFooter.style.display = 'flex';
        toggleButton.textContent = '_'; // Set button to minimize
    } else {
        chatBody.style.display = 'none';
        chatFooter.style.display = 'none';
        toggleButton.textContent = '◀'; // Set button to maximize
    }
});
