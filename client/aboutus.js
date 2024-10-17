// Initial map view set to the default location
const defaultLat = 22.581806;
const defaultLng = 88.4579492;
const map = L.map('map').setView([defaultLat, defaultLng], 13);  

// Add a tile layer to the map (this is the background of the map)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Marker for the location
let marker = L.marker([defaultLat, defaultLng]).addTo(map);

async function fetchLocation() {
    const lat = document.getElementById('lat').value;
    const lng = document.getElementById('lng').value;
    
    // Fetch data from your Node.js backend
    const response = await fetch(`http://localhost:5000/api/location?lat=${lat}&lng=${lng}`);
    const data = await response.json();

    // Update the map and marker position
    const newLatLng = [data.geometry.lat, data.geometry.lng];
    map.setView(newLatLng, 13);
    marker.setLatLng(newLatLng);

    // Display location details
    document.getElementById('info').innerHTML = `
        <h3>Location Details:</h3>
        <p><strong>Formatted Address:</strong> ${data.formatted_address}</p>
        <p><strong>City:</strong> ${data.components.city}</p>
        <p><strong>Country:</strong> ${data.components.country}</p>
        <p><strong>Postal Code:</strong> ${data.components.postcode}</p>
    `;
}
