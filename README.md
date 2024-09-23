# PostAway API

PostAway is a backend API for managing user posts, comments, and likes, with additional features such as filtering posts, saving drafts, and archiving posts. The API is built using Node.js and Express.js.

## Features

- User Authentication (Signup, Signin)
- Create, update, and delete posts
- Filter posts by caption
- Comment on posts
- Like posts
- Middleware for logging requests (excluding signup and signin routes)

## Tech Stack

- **Backend**: Node.js, Express.js
- **Authentication**: JSON Web Token (JWT)
- **File Upload**: Multer
- **Logging**: Winston


## API Endpoints

### User Routes
- **POST** `/api/signup` – Register a new user
- **POST** `/api/signin` – Authenticate and login a user

### Post Routes
- **GET** `/api/posts/all` – Get all posts
- **GET** `/api/posts/:id` – Get a post by its ID
- **GET** `/api/posts/filter` – Filter posts by caption
- **POST** `/api/posts/` – Create a new post (requires JWT auth)
- **PUT** `/api/posts/:id` – Update an existing post (requires JWT auth)
- **DELETE** `/api/posts/:postID` – Delete a post by its ID (requires JWT auth)

### Comment Routes
- **GET** `/api/comments/:postID` – Get all comments for a specific post
- **POST** `/api/comments/:postID` – Add a comment to a post (requires JWT auth)
- **DELETE** `/api/comments/:commentID` – Delete a comment (requires JWT auth)
- **PUT** `/api/comments/:commentID` – Update an existing comment (requires JWT auth)

### Like Routes
- **GET** `/api/likes/:postID` – Get all likes for a specific post
- **GET** `/api/likes/toggle/:postID` – Like or unlike a post (requires JWT auth)

## Project Structure

```
├── images/
├── src/
|   ├── errorHandler/
│   │   └── applicationError.js
│   ├── features/
│   │   ├── comment/
│   │   │   ├── comment.controller.js
│   │   │   ├── comment.model.js
│   │   │   └── comment.routes.js
│   │   ├── like/
│   │   │   ├── like.controller.js
│   │   │   ├── like.model.js
│   │   │   └── like.routes.js
│   │   ├── post/
│   │   │   ├── post.controller.js
│   │   │   ├── post.model.js
│   │   │   └── post.routes.js
│   │   └── user/
│   │       ├── user.controller.js
│   │       ├── user.model.js
│   │       └── user.routes.js
│   └── middleware/
│       ├── fileUploadMiddleware.js
│       ├── jwt.middleware.js
│       └── logger.middleware.js
├── .env
├── index.js
├── logs.txt
├── package.lock.json
├── package.json
├── README.md
└── server.js
```

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tanmaygupta07/PostAway_API.git
   cd PostAway_API
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create `.env` file**:
   ```plaintext
   JWT_SECRET=<your_jwt_secret>
   ```

4. **Run the server**:
   ```bash
   npm start
   ```
