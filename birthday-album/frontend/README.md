# Frontend - Birthday Memory Album Application

React-based frontend for birthday memory album application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file based on `.env.example`:
```bash
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Features

- Gmail authentication via Google OAuth
- Create multiple birthday albums
- Add memories (images, text, personal memories)
- View memories in a timeline format
- Edit and delete memories
- Responsive design

## Project Structure

```
src/
├── pages/
│   ├── Login.js          # Login page with Google OAuth
│   ├── Dashboard.js      # Album list and creation
│   └── AlbumDetail.js    # Album view and memory management
├── services/
│   └── api.js            # API service with axios
├── styles/
│   ├── Auth.css          # Login page styles
│   ├── Dashboard.css     # Dashboard styles
│   ├── AlbumDetail.css   # Album detail styles
│   ├── App.css           # App styles
│   └── index.css         # Global styles
├── App.js                # Main app component
└── index.js              # React entry point
```

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
