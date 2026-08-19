# 🔐 JWT Authentication — React & Node.js

A full-stack authentication application built with **React.js, Node.js, Express.js, MongoDB Atlas, and JWT**.

This project demonstrates how to implement secure user registration, login, password hashing, JWT-based authentication, protected routes, Axios interceptors, and authentication state management using React Context API.

---

<img width="1024" height="559" alt="e1b205d6-1397-48a5-845f-69c761f5cf97" src="https://github.com/user-attachments/assets/f16fe855-050f-407c-9c45-9684014fa13f" />

<img width="1024" height="559" alt="f2f28145-8653-4692-89ea-6313a340bc95" src="https://github.com/user-attachments/assets/786d7165-14f2-46b9-9615-f30f97d130ce" />



## 🚀 Features

* User Registration
* User Login
* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Protected React routes
* MongoDB Atlas integration
* Axios API client
* Axios request interceptor
* React Context API for authentication state
* Login / Logout functionality
* Authentication persistence using browser storage
* Error handling
* Loading states
* Responsive authentication UI

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Context API
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (`jsonwebtoken`)
* bcryptjs
* CORS
* dotenv

### Database

* MongoDB Atlas

---

# 📁 Project Structure

```text
jwt-auth/
│
├── backend/
│   │
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── app.js
│   └── package.json
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# 🔄 Authentication Flow

```text
                     ┌───────────────────┐
                     │     React.js      │
                     │                   │
                     │ Login / Register  │
                     └─────────┬─────────┘
                               │
                               │ HTTP Request
                               ▼
                     ┌───────────────────┐
                     │   Express.js      │
                     │                   │
                     │ Auth Controllers  │
                     └─────────┬─────────┘
                               │
                     ┌─────────┴─────────┐
                     │                   │
                     ▼                   ▼
                  bcrypt                JWT
                     │                   │
                     │                   ▼
                     │              Access Token
                     │                   │
                     └─────────┬─────────┘
                               ▼
                     ┌───────────────────┐
                     │   MongoDB Atlas   │
                     │                   │
                     │      Users        │
                     └───────────────────┘
```

---

# 🔑 JWT Protected Route Flow

```text
React
  │
  │ Authorization: Bearer <JWT>
  ▼
Axios Interceptor
  │
  ▼
Express Server
  │
  ▼
JWT Middleware
  │
  ▼
jwt.verify()
  │
  ├────────────── Invalid ──────────────► 401 Unauthorized
  │
  ▼
Valid Token
  │
  ▼
Protected Controller
  │
  ▼
MongoDB Atlas
  │
  ▼
Response
```

---

# 🔐 How Authentication Works

## 1. Registration

The user submits:

```json
{
  "name": "Nikhil",
  "email": "nikhil@example.com",
  "password": "password"
}
```

The backend:

1. Checks whether the email already exists.
2. Hashes the password using bcrypt.
3. Stores the user in MongoDB Atlas.
4. Never stores the original password.

Example stored password:

```text
$2b$10$xxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 2. Login

The user submits their email and password.

The backend:

1. Finds the user in MongoDB Atlas.
2. Compares the password using `bcrypt.compare()`.
3. Generates a JWT if the credentials are valid.
4. Sends the JWT back to the React application.

Example:

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## 3. Protected API Request

React sends:

```http
Authorization: Bearer <JWT>
```

The Express middleware:

```javascript
jwt.verify(token, process.env.JWT_SECRET);
```

verifies the token.

If valid:

```javascript
req.user = decoded;
next();
```

allows the request to continue.

---

# 📡 API Endpoints

## Authentication APIs

| Method | Endpoint             | Authentication | Description         |
| ------ | -------------------- | -------------- | ------------------- |
| POST   | `/api/auth/register` | ❌              | Register a new user |
| POST   | `/api/auth/login`    | ❌              | Login user          |

## User APIs

| Method | Endpoint            | Authentication | Description            |
| ------ | ------------------- | -------------- | ---------------------- |
| GET    | `/api/user/profile` | ✅              | Get authenticated user |

---

# 📝 API Examples

## Register

### Request

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "name": "Nikhil",
  "email": "nikhil@example.com",
  "password": "Nikhil@123"
}
```

### Response

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "68xxxxxxxx",
    "name": "Nikhil",
    "email": "nikhil@example.com"
  }
}
```

---

## Login

### Request

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "nikhil@example.com",
  "password": "Nikhil@123"
}
```

### Response

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## Get Profile

### Request

```http
GET /api/user/profile
Authorization: Bearer <JWT_TOKEN>
```

### Response

```json
{
  "user": {
    "_id": "68xxxxxxxx",
    "name": "Nikhil",
    "email": "nikhil@example.com"
  }
}
```

---

# ⚙️ Installation & Setup

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/jwt-authentication.git
```

Move into the project:

```bash
cd jwt-authentication
```

---

# 🖥️ Backend Setup

Move into the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

## Create `.env`

Create:

```text
backend/.env
```

Add:

```env
PORT=5000

MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/jwt_auth?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_jwt_key
```

### Environment Variables

| Variable     | Description                     |
| ------------ | ------------------------------- |
| `PORT`       | Backend server port             |
| `MONGO_URI`  | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key used to sign JWT     |

> Never commit your `.env` file to GitHub.

---

## Start Backend

Development:

```bash
npm run dev
```

Or:

```bash
node app.js
```

Backend should run on:

```text
http://localhost:5000
```

---

# ⚛️ Frontend Setup

Open another terminal.

From the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start React:

```bash
npm run dev
```

Vite will provide a URL similar to:

```text
http://localhost:5173
```

---

# 🔗 Frontend → Backend Connection

The frontend Axios configuration is located at:

```text
src/services/api.js
```

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
```

The Axios interceptor automatically attaches the JWT to API requests.

---

# 🧠 React Authentication Architecture

The application uses **Context API** to maintain authentication state.

```text
                 AuthProvider
                     │
        ┌────────────┼────────────┐
        │            │            │
       user    isAuthenticated   loading
        │
        ├───────────────┐
        │               │
      login           logout
        │               │
        ▼               ▼
   JWT Token       Remove Token
```

Components can access authentication state using:

```javascript
const {
  user,
  isAuthenticated,
  login,
  logout
} = useAuth();
```

---

# 🛡️ Protected Routes

The project uses a `ProtectedRoute` component.

```text
/profile
   │
   ▼
ProtectedRoute
   │
   ├── Authenticated
   │       │
   │       ▼
   │     Profile
   │
   └── Not Authenticated
           │
           ▼
         /login
```

Example:

```jsx
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
```

---

# 🗄️ MongoDB Atlas

The application uses MongoDB Atlas as its cloud database.

Database:

```text
jwt_auth
```

Collection:

```text
users
```

Example document:

```json
{
  "_id": "68xxxxxxxx",
  "name": "Nikhil",
  "email": "nikhil@example.com",
  "password": "$2b$10$xxxxxxxxxxxxxxxx",
  "createdAt": "2026-08-19T00:00:00.000Z",
  "updatedAt": "2026-08-19T00:00:00.000Z"
}
```

The password is stored as a **bcrypt hash**, not plain text.

---

# 🔒 Security Considerations

This project demonstrates JWT authentication for learning purposes.

Important security practices include:

* Never store plain-text passwords.
* Use bcrypt for password hashing.
* Never expose `JWT_SECRET` to the frontend.
* Never commit `.env` to GitHub.
* Use HTTPS in production.
* Use strong JWT secrets.
* Validate user input.
* Use secure CORS configuration in production.
* Use short-lived access tokens.
* For production applications, consider using HttpOnly Secure cookies for refresh tokens.
* Restrict MongoDB Atlas network access in production.

---

# 🚀 Future Improvements

The current project can be extended with:

* [ ] Refresh tokens
* [ ] Access token + refresh token architecture
* [ ] HttpOnly cookies
* [ ] Refresh token rotation
* [ ] Automatic token refresh using Axios response interceptor
* [ ] Forgot password
* [ ] Reset password
* [ ] Email verification
* [ ] Role-based authorization
* [ ] Admin dashboard
* [ ] User management
* [ ] Form validation
* [ ] Rate limiting
* [ ] Helmet.js
* [ ] Request validation using Joi/Zod
* [ ] Production deployment
* [ ] Docker
* [ ] Unit testing
* [ ] Integration testing

---

# 🧪 Testing

You can test the APIs using:

* Postman
* Thunder Client
* Insomnia
* Browser DevTools

Recommended testing flow:

```text
1. Register
      ↓
2. Check MongoDB Atlas
      ↓
3. Login
      ↓
4. Receive JWT
      ↓
5. Access /profile
      ↓
6. Verify JWT
      ↓
7. Logout
      ↓
8. Try /profile again
      ↓
9. Receive 401 Unauthorized
```

---

# 📚 What I Learned From This Project

This project helped demonstrate practical implementation of:

* React.js
* React Router
* React Context API
* Custom React Hooks
* Axios
* Axios Interceptors
* Node.js
* Express.js
* REST APIs
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcrypt Password Hashing
* Middleware
* Protected Routes
* Authentication State Management
* Environment Variables
* API Error Handling
* Client-Server Communication

---

# 👨‍💻 Author

**Nikhil Dadhich**

Full Stack Developer | MERN Stack

### Technologies

```text
React.js
Node.js
Express.js
MongoDB
MongoDB Atlas
JavaScript
JWT
REST APIs
Git
```

---

# ⭐ If You Like This Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.

Feel free to fork the repository and use it for learning or as a starting point for your own authentication system.
