Cat Gallery Application 🐱
A multi-level cat gallery app that fetches and displays images from the Cat API. This project progressively demonstrates advanced features like pagination, infinite scrolling, modals with carousels, and optimized performance across three levels: Easy, Medium, and Hard.

Table of Contents
Features
Technologies Used
Installation
Usage
Project Structure
API Reference
Contributing
License
Features
Easy Level
Show More Button:

A "Show More" button triggers a new API request to fetch more cat images and append them to the existing list.
State Management:
Loading Spinner shows during data fetching.
Error Alert appears if the API call fails.
Responsive Grid Layout: Uses Masonry layout to display images neatly, adapting to different screen sizes.
Modal with Carousel:

Clicking on an image opens a modal.
The carousel inside the modal allows the user to browse through the fetched images.
Medium Level
Pagination:

The app displays a set of 15 images per page.
Users can navigate between pages using "Next" and "Previous" buttons.
Home Button resets the pagination to the first page.
Pagination Buttons: Pages from 1 to 10 are displayed, and the user can click on any page number to jump directly to that page.
State Management:

Loading Spinner: Shown while fetching new page data.
Error Handling: If the API request fails, an alert is displayed.
Responsive Grid Design:

The images are displayed in a 4-column grid on larger screens and adjust to smaller columns on mobile devices for an optimal viewing experience.
Modal with Carousel View:

Carousel inside the modal allows easy navigation between images on the current page.
Hard Level
Infinite Scrolling with Optimization:

As the user scrolls to the bottom, the next set of images is fetched and appended to the existing list.
Uses IntersectionObserver API for detecting when the user reaches the end of the page, ensuring smooth data loading.
Performance Optimization:

Images are lazily loaded to reduce initial load time.
The IntersectionObserver API disconnects automatically after fetching the new set of images, reducing unnecessary calls.
Single-Column Card Layout:

The images are displayed in a single-column layout, making it easy to browse on smaller screens.
Modal with Carousel:

Consistent Modal View: The carousel view inside the modal remains consistent across levels, allowing users to browse all fetched images smoothly.
Global Features
Fully Responsive Design:

Uses React-Bootstrap for responsive layouts, ensuring the gallery works well across mobile, tablet, and desktop screens.
State Management:

Loading State: A spinner indicates data fetching.
Error State: Displays an alert if the API call fails.
Empty State: If no images are available, it shows a relevant message.
Navbar with Routing:

The sticky navbar at the top allows users to switch between Easy, Medium, and Hard levels effortlessly.
Back to Top Button:

Appears when the user scrolls down, allowing smooth navigation back to the top.
Technologies Used
React.js: Frontend framework
React Router: For managing routes between pages
Bootstrap + React-Bootstrap: For responsive styling
React Icons: For back-to-top and fullscreen icons
Masonry Layout: Used for responsive grid design
IntersectionObserver API: Optimized infinite scrolling
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/cat-gallery-app.git
cd cat-gallery-app
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
Visit the app at:

arduino
Copy code
http://localhost:3000
Usage
Easy Level:
Navigate to /easy and click the Show More button to fetch more images. Explore the modal view with carousel for image browsing.

Medium Level:
Navigate to /medium to explore pagination. Use the Next/Previous buttons to switch between pages, and click on an image to open the modal carousel view.

Hard Level:
Navigate to /hard for an infinite scrolling experience. As you scroll to the bottom, new images will load automatically. Browse images using the carousel in the modal.

Navigation:
Use the navbar at the top to switch between the three levels.

Project Structure
java
Copy code
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
API Reference
This project uses the Cat API to fetch images.

Base URL: https://api.thecatapi.com/v1/images/search
Example API Request:
bash
Copy code
https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc
Parameters:
limit: Number of images per page.
page: The page number to fetch.
order: Image order (e.g., Desc).
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch: git checkout -b feature/your-feature-name
Commit your changes: git commit -m 'Add some feature'
Push to the branch: git push origin feature/your-feature-name
Open a Pull Request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Conclusion
This project demonstrates various progressive web development concepts like grid layouts, pagination, infinite scrolling, and modal carousels with proper state management and responsive design. The app offers a clean, user-friendly experience and showcases how to integrate external APIs efficiently.

This README.md covers everything in depth, highlighting your thoughtful implementation at each level. Feel free to tweak it as per your needs! 😊







