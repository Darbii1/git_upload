# Birthday Memory Album Application

A full-stack web application for creating and managing birthday memory albums. Users can sign in with Google, create albums for different celebrations, and add memories including photos, text notes, and special moments.

## Features

✨ **Core Features**
- Gmail authentication via Google OAuth 2.0
- Create multiple birthday albums for different people/years
- Add memories to albums with multiple content types:
  - 📷 Photos/Images
  - 📝 Text notes
  - ✨ Special memories
- Timeline view of memories in each album
- Edit and delete memories
- Responsive design for all devices

## Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js with Google OAuth 2.0
- **Dependencies**: 
  - mongoose (MongoDB ODM)
  - jsonwebtoken (JWT)
  - cors
  - dotenv

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3
- **State Management**: React Hooks

## Project Structure

```
birthday-album/
├── backend/                    # Express.js server
│   ├── src/
│   │   ├── config/            # Database and passport config
│   │   ├── controllers/       # Route controllers
│   │   ├── models/            # MongoDB schemas
│   │   ├── middleware/        # Auth middleware
│   │   ├── routes/            # API routes
│   │   └── server.js          # Express app entry point
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/                   # React app
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/             # React pages
│   │   ├── services/          # API service
│   │   ├── styles/            # CSS files
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── .github/
    └── copilot-instructions.md
```


## Future Enhancements

- [ ] Share albums with others
- [ ] Add video support for memories
- [ ] Create slideshows
- [ ] Add comments/notes on memories
- [ ] Search and filter memories
- [ ] Export album as PDF
- [ ] Multiple photo upload
- [ ] Photo gallery view
- [ ] Collaborative albums


## Support

For issues or questions, please open an issue on GitHub or contact the development team.

## Contributors

- Darbii_dev

---

**Happy Birthday Album Making! 🎉**
