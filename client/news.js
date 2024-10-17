// Function to fetch data from a given URL and render it into the specified container
async function fetchAndRender(url, containerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear existing content

        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
        
            const title = document.createElement('h2');
            title.textContent = item.title;
            itemDiv.appendChild(title);
        
            const description = document.createElement('p');
            description.textContent = item.description;
            itemDiv.appendChild(description);
        
            const publishAt = document.createElement('p');
            publishAt.textContent = `Published At: ${new Date(item.publishAt).toLocaleString()}`;
            itemDiv.appendChild(publishAt);
        
            const sourceUrl = document.createElement('a');
            sourceUrl.href = item.sourceUrl;
            sourceUrl.target = '_blank';
            sourceUrl.textContent = 'Read more';
            itemDiv.appendChild(sourceUrl);
        
            if (item.image) {
                const image = document.createElement('img');
                image.src = `http://localhost:5000/${item.image}`; // Prepend the base URL
                image.alt = item.title;
                itemDiv.appendChild(image);
            }
            
            container.appendChild(itemDiv);
        });
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fetch data for news and sports when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchAndRender('http://localhost:5000/api/news/', 'news-container');
    /* fetchImagesForSlider('http://localhost:5000/api/news/', 'slider-container'); */ // Fetch images for the slider    
});