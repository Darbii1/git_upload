# Backend - Birthday Memory Album Server

API server for birthday memory album application with Google OAuth authentication.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file based on `.env.example`:
```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

3. Run the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `GET /api/auth/google` - Initiate Google OAuth login
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/profile` - Get current user profile (protected)
- `POST /api/auth/logout` - Logout (protected)

### Albums
- `POST /api/albums` - Create album (protected)
- `GET /api/albums` - Get all user albums (protected)
- `GET /api/albums/:id` - Get album by ID (protected)
- `PUT /api/albums/:id` - Update album (protected)
- `DELETE /api/albums/:id` - Delete album (protected)

### Memories
- `POST /api/memories` - Create memory (protected)
- `GET /api/memories/album/:albumId` - Get memories by album (protected)
- `PUT /api/memories/:id` - Update memory (protected)
- `DELETE /api/memories/:id` - Delete memory (protected)
