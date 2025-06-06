
## Description

NutriScan is a final-year project designed to help users analyze nutritional content. This full-stack project uses the MERN stack (MongoDB, Express, React, Node.js) and follows a modular structure for easier maintenance and scalability.

### Backend

The backend is implemented using Node.js and Express and connects to a MongoDB database. It includes the following folders:

- **config/**: Configuration files for database connections and environment settings.
- **controllers/**: Handles the business logic for API endpoints.
- **models/**: Mongoose schemas for MongoDB collections.
- **routes/**: API route definitions and handlers.
- **middleware/**: Custom middleware (e.g., authentication, logging).
- **utils/**: Utility functions for common backend tasks.

### Frontend

The frontend is built with React and follows a component-based structure:

- **public/**: Contains static files, including `index.html`.
- **src/assets/**: Holds static assets like images and fonts.
- **src/components/**: Reusable components for the UI.
- **src/pages/**: Page components, such as Home, Login, and Dashboard.
- **src/services/**: Functions for making API requests to the backend.
- **src/hooks/**: Custom React hooks for shared logic.
- **src/context/**: Context API files for global state management.

## Getting Started

1. Clone the repository.
2. Set up the environment variables in both `backend/.env` and `frontend/.env`.
3. Install dependencies for both frontend and backend.
4. Start the backend server and the frontend client.

## .gitignore

The `.gitignore` file is configured to exclude unnecessary files from version control, including `node_modules`, `.env` files, build outputs, and OS-specific files.
#   N u t r i S c a n  
 #   N u t r i S c a n  
 