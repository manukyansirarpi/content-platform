# Image Gallery Application

Welcome to the Image Gallery Application! This is a React-based web app that allows users to browse, search, and view high-quality photos. It features an infinite scrolling masonry grid layout and integrates with two popular photo APIs: Pexels and Unsplash.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Performance Optimization](#performance-optimization)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [Error Handling](#error-handling)

## Features
- Masonry grid layout for displaying images.
- Infinite scrolling with intersection observer to load more photos dynamically.
- Integrated with Pexels and Unsplash APIs for curated and searchable images.
- Detailed photo view with photographer details and a link to the original source.
- Debounced search feature to avoid excessive API calls.
- Error handling with a custom Error Boundary component.

## Technologies Used
- **React**: Frontend library for building the user interface.
- **React Router**: For navigating between pages.
- **Styled-components**: For styling the components using CSS-in-JS.
- **Intersection Observer API**: For loading more photos as the user scrolls down.
- **Pexels API** and **Unsplash API**: For fetching curated and searchable photos.
- **Lodash debounce**: To optimize user input handling in the search bar.
- **TypeScript**: For type safety in the project.

## Performance Optimization
1. **Lazy Loading Images**: Images are loaded with the `loading="lazy"` attribute to improve the performance by not loading all the images at once.
2. **Debounced Search Input**: The search input is debounced using `lodash/debounce` to prevent unnecessary API calls on each keystroke, optimizing performance and minimizing rate limits.
3. **Intersection Observer**: The intersection observer is used to load more photos as the user scrolls, creating an infinite scrolling experience without overloading the server with requests.
4. **Error Boundary**: Implemented an `ErrorBoundary` component to catch any runtime errors and ensure that the app does not crash unexpectedly, providing a user-friendly message instead.

## Getting Started
To get started with this project, you need to clone the repository and install the required dependencies.

### Prerequisites
- Node.js (>= 14.x)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone git@github.com:manukyansirarpi/content-platform.git
   cd content-platform
   ```
2. Install the dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

## Running the Application
After installing the dependencies, you can run the application locally:

```sh
npm start
# or
yarn start
```

This command will start the development server, and you can view the app in your browser at `http://localhost:3000`.

## Environment Variables
The application requires API keys for both Pexels and Unsplash. To configure these, create a `.env` file in the root directory and add the following:

```sh
REACT_APP_PEXELS_API_KEY=your_pexels_api_key
REACT_APP_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

Make sure to replace `your_pexels_api_key` and `your_unsplash_access_key` with your actual API keys.

## API Integration
The application integrates with the following photo APIs:

- **Pexels API**: For fetching curated photos.
- **Unsplash API**: For searching photos based on user input.

These APIs are utilized in the `pexelsApi.ts` and `unsplashApi.ts` files, which contain functions to fetch photos based on different requirements.

## Error Handling
The application includes a custom `ErrorBoundary` component that is used to catch any unexpected runtime errors during component rendering. This helps in gracefully handling errors without crashing the entire application. Additionally, retry logic is implemented for loading photos, especially to handle rate limits.

## Demo

[https://content-platform-zeta.vercel.app/](https://content-platform-zeta.vercel.app/)


## Page Speed analysis  
[https://pagespeed.web.dev/analysis/https-content-platform-zeta-vercel-app/85km1yvtod?form_factor=mobile](https://pagespeed.web.dev/analysis/https-content-platform-zeta-vercel-app/85km1yvtod?form_factor=mobile)

## lighthouse reports

![Screenshot 2024-11-09 at 15 35 26](https://github.com/user-attachments/assets/f965a6fc-37a8-4131-bf3b-01563645043a)



  

