
  <h1>🐱 Cat Gallery Application</h1>
  <p>A multi-level cat gallery app that uses the <a href="https://thecatapi.com/">Cat API</a> to fetch and display cat images. 
     This project demonstrates progressive implementation across three levels: <b>Easy, Medium, and Hard</b>, with advanced features like pagination, infinite scrolling, modals, and optimized performance.</p>

  <h2>📋 Table of Contents</h2>
  <ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#technologies-used">Technologies Used</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#api-reference">API Reference</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ul>

  <h2 id="features">🚀 Features</h2>

  <h3>Easy Level</h3>
  <ul>
    <li><b>Show More Button:</b> Fetch more images on button click and append to the existing list.</li>
    <li><b>Grid Layout:</b> Uses Masonry layout to display images responsively.</li>
    <li><b>Loading and Error Handling:</b> Spinner and alert displayed during data fetching or on error.</li>
    <li><b>Modal with Carousel:</b> Browse images inside a modal carousel view.</li>
  </ul>

  <h3>Medium Level</h3>
  <ul>
    <li><b>Pagination:</b> Navigate through pages with Next and Previous buttons, and display up to 10 pages.</li>
    <li><b>Home Button:</b> Resets the pagination to page 1.</li>
    <li><b>Loading and Error Handling:</b> Spinner for loading state and alerts for errors.</li>
    <li><b>Responsive Grid Layout:</b> Adjusts columns for different screen sizes.</li>
    <li><b>Modal Carousel:</b> View images in a carousel inside a modal.</li>
  </ul>

  <h3>Hard Level</h3>
  <ul>
    <li><b>Infinite Scrolling:</b> Automatically fetch and load more images when the user scrolls to the bottom.</li>
    <li><b>Single-Column Layout:</b> Optimized for a smooth browsing experience on all devices.</li>
    <li><b>IntersectionObserver API:</b> Used for optimized scroll detection.</li>
    <li><b>Modal with Carousel:</b> Consistent modal carousel view across all levels.</li>
  </ul>

  <h3>Global Features</h3>
  <ul>
    <li><b>Responsive Design:</b> Works well across mobile, tablet, and desktop devices.</li>
    <li><b>Back to Top Button:</b> Smooth scrolling to the top of the page.</li>
    <li><b>State Management:</b> Handles loading, error, and empty states gracefully.</li>
  </ul>

  <h2 id="technologies-used">🛠️ Technologies Used</h2>
  <ul>
    <li>React.js</li>
    <li>React Router</li>
    <li>Bootstrap & React-Bootstrap</li>
    <li>React Icons</li>
    <li>Masonry Layout</li>
    <li>IntersectionObserver API</li>
  </ul>

  <h2 id="installation">⚙️ Installation</h2>
  <pre><code>
git clone https://github.com/your-username/cat-gallery-app.git
cd cat-gallery-app
npm install
npm start
  </code></pre>
  <p>Visit the app at <code>http://localhost:3000</code>.</p>

  <h2 id="usage">📄 Usage</h2>
  <ul>
    <li><b>Easy Level:</b> Navigate to <code>/easy</code> and click the "Show More" button to fetch more images.</li>
    <li><b>Medium Level:</b> Navigate to <code>/medium</code> to explore pagination. Use the Next/Previous buttons to switch pages.</li>
    <li><b>Hard Level:</b> Navigate to <code>/hard</code> for an infinite scrolling experience. Scroll down to load more images.</li>
  </ul>

  <h2 id="project-structure">📁 Project Structure</h2>
  <pre><code>
cat-gallery-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AppNavbar.js
│   │   ├── EasyLevel.js
│   │   ├── MediumLevel.js
│   │   └── HardLevel.js
│   ├── App.js
│   ├── App.css
│   └── index.js
└── package.json
  </code></pre>

  <h2 id="api-reference">📚 API Reference</h2>
  <p>This project uses the <a href="https://thecatapi.com/">Cat API</a>.</p>
  <pre><code>
https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc
  </code></pre>

  <h2 id="contributing">🤝 Contributing</h2>
  <ol>
    <li>Fork the repository.</li>
    <li>Create a new branch: <code>git checkout -b feature/your-feature-name</code></li>
    <li>Commit your changes: <code>git commit -m 'Add some feature'</code></li>
    <li>Push to the branch: <code>git push origin feature/your-feature-name</code></li>
    <li>Open a Pull Request.</li>
  </ol>

  <h2 id="license">📄 License</h2>
  <p>This project is licensed under the MIT License. See the <code>LICENSE</code> file for details.</p>

</body>

</html>
