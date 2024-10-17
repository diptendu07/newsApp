// Function to fetch images for the slider
async function fetchImagesForSlider(url, sliderContainerId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const sliderContainer = document.getElementById(sliderContainerId);
        const slidesDiv = document.createElement('div');
        slidesDiv.className = 'slides'; // Create a new div for slides
        slidesDiv.style.display = 'flex'; // Flexbox for horizontal layout
        slidesDiv.style.transition = 'transform 0.5s ease-in-out'; // Smooth transition
        sliderContainer.appendChild(slidesDiv); // Append to slider container

        data.forEach(item => {
            if (item.image) {
                const slide = document.createElement('div');
                slide.className = 'slide';
                const image = document.createElement('img');
                image.src = `http://localhost:5000/${item.image}`; // Prepend base URL for image
                image.alt = item.title;
                image.style.width = '100%'; // Make image responsive
                slide.appendChild(image);
                slidesDiv.appendChild(slide);
            }
        });

        // Initialize slider functionality
        let currentSlide = 0;
        const totalSlides = slidesDiv.children.length;

        function showSlide(index) {
            if (index >= totalSlides) currentSlide = 0;
            else if (index < 0) currentSlide = totalSlides - 1;
            else currentSlide = index;

            const offset = -currentSlide * 100; // Calculate offset
            slidesDiv.style.transform = `translateX(${offset}%)`; // Move the slides
        }

        // Add event listeners for controls
        document.getElementById('prevBtn').addEventListener('click', () => showSlide(currentSlide - 1));
        document.getElementById('nextBtn').addEventListener('click', () => showSlide(currentSlide + 1));

        showSlide(currentSlide); // Show the first slide

    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

// Fetch data for news and sports when the page loads
document.addEventListener('DOMContentLoaded', () => {    
    fetchImagesForSlider('http://localhost:5000/api/news/', 'slider-container'); // Fetch images for the slider    
});

// latest.js
document.addEventListener('DOMContentLoaded', () => {
    fetchLatestNews();
});

// Function to fetch the latest news and render it
async function fetchLatestNews() {
    const url = 'http://localhost:5000/api/news/latest'; // Adjust this URL based on your backend route
    await fetchAndRender(url, 'news-container');
}

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

