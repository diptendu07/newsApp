// Dashboard.js

// Handle news form submission
document.getElementById('newsForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    await handleFormSubmit('news');
});

// Handle sports form submission
document.getElementById('sportsForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    await handleFormSubmit('sports');
});

// Function to handle both news and sports form submissions
async function handleFormSubmit(type) {
    const title = document.getElementById(`${type}Title`).value;
    const description = document.getElementById(`${type}Description`).value;
    const publishAt = document.getElementById(`${type}PublishAt`).value;
    const sourceUrl = document.getElementById(`${type}SourceUrl`).value;
    const image = document.getElementById(`${type}Image`).files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('publishAt', publishAt);
    formData.append('sourceUrl', sourceUrl);
    formData.append('image', image);

    try {
        const response = await fetch(`http://localhost:5000/api/${type}/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
        });

        if (response.ok) {
            alert(`${type.charAt(0).toUpperCase() + type.slice(1)} posted successfully`);
            type === 'news' ? fetchNews() : fetchSports(); // Refresh list
            document.getElementById(`${type}Form`).reset(); // Reset form
        } else {
            const data = await response.json();
            alert(data.message || `Failed to post ${type}`);
        }
    } catch (error) {
        console.error(`Error posting ${type}:`, error);
        alert(`An error occurred while posting ${type}.`);
    }
}

// Function to fetch and display news
async function fetchNews() {
    await fetchItems('news', 'newsBody');
}

// Function to fetch and display sports
async function fetchSports() {
    await fetchItems('sports', 'sportsBody');
}

// Fetch data for either news or sports
async function fetchItems(type, bodyId) {
    try {
        const response = await fetch(`http://localhost:5000/api/${type}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const items = await response.json();
        const body = document.getElementById(bodyId);
        body.innerHTML = ''; // Clear existing content

        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.title}</td>
                <td>${item.description}</td>
                <td>${new Date(item.publishAt).toLocaleDateString()}</td>
                <td>
                    <button onclick="openEditModal('${type}', '${item._id}')">Edit</button>
                    <button onclick="deleteItem('${type}', '${item._id}')">Delete</button>
                </td>
            `;
            body.appendChild(row);
        });
    } catch (error) {
        console.error(`Error fetching ${type}:`, error);
    }
}

// Function to delete news or sports
async function deleteItem(type, id) {
    try {
        const response = await fetch(`http://localhost:5000/api/${type}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        if (response.ok) {
            alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
            type === 'news' ? fetchNews() : fetchSports(); // Refresh table
        } else {
            const data = await response.json();
            alert(data.message || `Failed to delete ${type}`);
        }
    } catch (error) {
        console.error(`Error deleting ${type}:`, error);
    }
}

// Function to handle opening the edit modal
function openEditModal(type, id) {
    document.getElementById('editModal').style.display = 'block';
    const item = document.querySelector(`#${type}Body [data-id="${id}"]`);

    document.getElementById('editTitle').value = item.querySelector('.item-title').textContent;
    document.getElementById('editDescription').value = item.querySelector('.item-description').textContent;
    document.getElementById('editPublishAt').value = new Date(item.querySelector('.item-publishAt').textContent).toISOString().split('T')[0];
    document.getElementById('editSourceUrl').value = item.querySelector('.item-sourceUrl').textContent;
    document.getElementById('editId').value = id;

    // Change form action depending on whether it is news or sports
    document.getElementById('editForm').onsubmit = function (e) {
        e.preventDefault();
        handleEditFormSubmit(type);
    };
}

// Function to handle the PUT request to update the news/sports item
async function handleEditFormSubmit(type) {
    const id = document.getElementById('editId').value;
    const title = document.getElementById('editTitle').value;
    const description = document.getElementById('editDescription').value;
    const publishAt = document.getElementById('editPublishAt').value;
    const sourceUrl = document.getElementById('editSourceUrl').value;
    const image = document.getElementById('editImage').files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('publishAt', publishAt);
    formData.append('sourceUrl', sourceUrl);
    if (image) {
        formData.append('image', image); // Only append image if a new one is selected
    }

    try {
        const response = await fetch(`http://localhost:5000/api/${type}/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
        });

        if (response.ok) {
            alert(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully`);
            type === 'news' ? fetchNews() : fetchSports(); // Refresh list
            closeEditModal();
        } else {
            const data = await response.json();
            alert(data.message || `Failed to update ${type}`);
        }
    } catch (error) {
        console.error(`Error updating ${type}:`, error);
        alert(`An error occurred while updating ${type}.`);
    }
}

// Function to close the edit modal
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    document.getElementById('editForm').reset();
}

async function fetchItems(type, bodyId) {
    try {
        const response = await fetch(`http://localhost:5000/api/${type}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const items = await response.json();
        const body = document.getElementById(bodyId);
        body.innerHTML = ''; // Clear existing content

        items.forEach(item => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', item._id); // Add data-id for easy access

            row.innerHTML = `
                <td class="item-title">${item.title}</td>
                <td class="item-description">${item.description}</td>
                <td class="item-publishAt">${new Date(item.publishAt).toLocaleDateString()}</td>
                <td class="item-sourceUrl">${item.sourceUrl}</td>
                <td>
                    <button onclick="openEditModal('${type}', '${item._id}')">Edit</button>
                    <button onclick="deleteItem('${type}', '${item._id}')">Delete</button>
                </td>
            `;
            body.appendChild(row);
        });
    } catch (error) {
        console.error(`Error fetching ${type}:`, error);
    }
}


// Logout functionality
document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.clear(); // Clear stored token
    window.location.href = '../login.html'; // Redirect to login
});

// Initialize fetch functions on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
    fetchSports();
});
