# 📚 Book Review API

A secure RESTful API built with Node.js, Express, MongoDB, and JWT authentication. Users can sign up, log in, add books, filter/book search, and post reviews.

---

## 🚀 Features

* 🔐 **Authentication**: User registration and login using JWT.
* 📖 **Books**: Create, list (with pagination and filters), and retrieve book details.
* ⭐ **Reviews**: Submit, update, delete reviews (one per user per book) with star ratings.
* 🎭 **Genres**: Fetch all distinct book genres.
* 🛡️ **Authorization**: Protected routes ensure only authors can modify their reviews.

---

## 📦 Project Structure

```
book-review-api/
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── reviewController.js
├── middlewares/
│   └── auth.js
├── models/
│   ├── Book.js
│   ├── Review.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── reviewRoutes.js
├── .env
├── server.js
├── package.json
└── README.md
```

---

## 🛠️ Installation

1. **Clone repository**

   ```bash
   git clone https://github.com/Rishikeshp8899/book-review-api.git
   cd book-review-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file in the root:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/bookReviewDB
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the server**

   ```bash
   npm start
   ```

   or with nodemon:

   ```bash
   npm run dev
   ```

Server will be running at `http://localhost:5000`.

---

## 🔗 API Endpoints

### Auth

| Method | Endpoint  | Description           |
| ------ | --------- | --------------------- |
| POST   | `/signup` | Register a new user   |
| POST   | `/login`  | Login and receive JWT |

### Books

| Method | Endpoint             | Description                                |
| ------ | -------------------- | ------------------------------------------ |
| POST   | `/books`             | Add a new book (auth required)             |
| GET    | `/books`             | List books (pagination & filters)          |
| GET    | `/books/:id`         | Get book details with reviews & avg rating |
| GET    | `/books/genres`      | List all unique genres                     |
| POST   | `/books/:id/reviews` | Submit a review (auth required)            |

### Reviews

| Method | Endpoint       | Description                           |
| ------ | -------------- | ------------------------------------- |
| PUT    | `/reviews/:id` | Update your review (auth & ownership) |
| DELETE | `/reviews/:id` | Delete your review (auth & ownership) |

## 📖 Example Requests

### Signup

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"Test@1234"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"Test@1234"}'
```

### Add Book

```bash
curl -X POST http://localhost:5000/api/books \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Clean Code","author":"Robert C. Martin","publishedYear":2008,"genre":"Software Engineering"}'
```

### Get Books (with filters)

```bash
curl http://localhost:5000/api/books?page=1&limit=5&author="Robert C. Martin"
```

### Get Book Details

```bash
curl http://localhost:5000/api/books/<BOOK_ID> \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

### Submit Review

```bash
curl -X POST http://localhost:5000/api/books/<BOOK_ID>/reviews \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"rating":5,"review":"Excellent read!"}'
```

---

## ⚙️ Design Decisions

* **Modular Controllers & Routes**: Separates concerns and improves maintainability.
* **JWT Auth**: Stateless sessions, easy to scale.
* **Compound Index on Reviews**: Ensures one review per user per book.
* **Pagination & Filtering**: Efficient querying for large datasets.

---

## 📊 Database Schema Overview

* **User**

  * `username`: String, unique, required
  * `password`: String (hashed), required

* **Book**

  * `title`: String, required
  * `author`: String
  * `publishedYear`: Number
  * `genre`: String
  * `createdAt`, `updatedAt`: Date

* **Review**

  * `user`: ObjectId → User, required
  * `book`: ObjectId → Book, required
  * `review`: String, required
  * `rating`: Number, required
  * `createdAt`, `updatedAt`: Date

---

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests for bugs and enhancements.

## 📄 License

This project is licensed under the MIT License.
