# Lotus • Yoga • Studio

A modern React and Node.js application replicating the "Lotus • Yoga • Studio" website with full functionality including tab switching, dark/light mode toggle, and form submissions.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Interactive Elements**: 
  - Tab switching in the "Three Pillars" section
  - Dark/Light mode toggle
  - Working contact and waitlist forms
- **Modern Tech Stack**: React with Vite for frontend, Express.js for backend
- **Form Handling**: Real-time form submissions with backend API integration

## Project Structure

```
lotus-yoga-studio/
├── src/                    # React frontend
│   ├── App.jsx            # Main React component
│   ├── App.css            # All styling
│   └── main.jsx           # React entry point
├── backend/               # Node.js backend
│   ├── server.js          # Express server
│   └── package.json       # Backend dependencies
├── index.html             # HTML template with meta tags
└── package.json           # Frontend dependencies
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd lotus-yoga-studio
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

## Running the Application

You need to run both the frontend and backend servers:

### 1. Start the Backend Server
```bash
cd backend
npm start
```
The backend will run on `http://localhost:3001`

### 2. Start the Frontend Development Server
In a new terminal:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

### 3. Open the Application
Navigate to `http://localhost:5173` in your browser.

## API Endpoints

The backend provides the following endpoints:

- `GET /` - API status
- `POST /api/waitlist` - Submit waitlist form
- `POST /api/contact` - Submit contact form

## Features Implemented

### Frontend (React)
- ✅ Exact replica of original HTML structure
- ✅ All CSS styling converted and optimized
- ✅ Interactive tab switching
- ✅ Dark/Light mode toggle
- ✅ Form validation and submission
- ✅ Responsive design
- ✅ Modern React hooks (useState, useEffect)

### Backend (Node.js/Express)
- ✅ RESTful API endpoints
- ✅ CORS enabled for frontend communication
- ✅ Form data processing
- ✅ Error handling
- ✅ JSON response formatting

## Technologies Used

- **Frontend**: React 18, Vite, CSS3
- **Backend**: Node.js, Express.js
- **Fonts**: Inter, Plus Jakarta Sans, DM Sans (Google Fonts)
- **Development**: Hot reload, modern ES6+ syntax

## Development Notes

- The application maintains the exact visual design of the original HTML
- All interactive elements are fully functional
- Form submissions are handled by the backend API
- The design is fully responsive and works across all screen sizes
- Dark mode toggle affects the entire application theme

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes.
