# Quick Start Guide - Birthday Memory Album

## 📋 Prerequisites

Before you start, make sure you have:
- Node.js 16+ installed
- MongoDB Atlas free account (https://www.mongodb.com/cloud/atlas)
- Google Cloud Console project with OAuth 2.0 credentials

## 🚀 Step 1: Get Google OAuth Credentials

1. Go to https://console.cloud.google.com
2. Create a new project
3. Search for "Google+ API" and enable it
4. Go to "Credentials" → "Create OAuth 2.0 credentials"
5. Select "Web Application"
6. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
7. Save Client ID and Secret

## 🗄️ Step 2: Get MongoDB Connection String

1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<username>` and `<password>` with your credentials

## ⚙️ Step 3: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env with:
# - MONGODB_URI (from MongoDB Atlas)
# - GOOGLE_CLIENT_ID (from Google Console)
# - GOOGLE_CLIENT_SECRET (from Google Console)
# - JWT_SECRET (any random string, e.g., "your-secret-key-123")
```

## ⚙️ Step 4: Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Edit .env with:
# - REACT_APP_API_URL=http://localhost:5000/api
# - REACT_APP_GOOGLE_CLIENT_ID (same as backend)
```

## 🏃 Step 5: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend runs at: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
✅ Frontend runs at: http://localhost:3000

## 🧪 Step 6: Test the Application

1. Open http://localhost:3000 in your browser
2. Click "Sign in with Google"
3. Authenticate with your Gmail account
4. Create your first album
5. Add memories to the album

## 📁 Project Structure Summary

```
birthday-album/
├── backend/          # Express server, API routes, MongoDB models
├── frontend/         # React app, UI components, pages
└── README.md         # Full documentation
```

## 🔧 Troubleshooting

**Issue: "Cannot connect to MongoDB"**
- Check your MONGODB_URI in .env
- Ensure IP is whitelisted in MongoDB Atlas

**Issue: "Google login fails"**
- Verify Google OAuth credentials are correct
- Check redirect URI matches exactly

**Issue: Frontend won't load**
- Ensure backend is running (npm run dev in backend/)
- Check REACT_APP_API_URL in frontend/.env

## 📚 Key Files

- `backend/src/server.js` - Express server entry point
- `frontend/src/App.js` - React app entry point
- `backend/README.md` - Backend API documentation
- `frontend/README.md` - Frontend setup guide

## 🎉 You're Ready!

Your birthday memory album application is now ready to use. Start creating albums and capturing memories!

For more details, see [README.md](../README.md)
