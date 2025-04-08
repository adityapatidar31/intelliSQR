# Drive Video Link

📹 [Watch Demo](https://drive.google.com/file/d/1BqJ3s6W-I_CfwHNsAXLb904eMQBB3wO7/view?usp=sharing)

---

## 🔧 Backend

### ➤ SignUp API

<<<<<<< HEAD

- **URL:** `POST /api/v1/users/signUp`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourPassword",
    "confirmPassword": "yourPassword"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "User registered successfully"
  }
  ```

---

### ➤ Login API

- **URL:** `POST /api/v1/users/login`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourPassword"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Login successful"
  }
  ```

---

## 🎨 Frontend

### ➤ Sign Up Page

- User can register with email, password, and confirm password.
- Form validation using Zod + React Hook Form.
- Success and error notifications with `react-toastify`.

### ➤ Login Page

- User can log in with email and password.
- Displays error messages for invalid credentials.
- Uses React Query for API integration.

---

## 🚀 Tech Stack

### Backend:

- Node.js
- Express.js
- TypeScript
- Zod (Validation)
- Prisma
- JWT

### Frontend:

- React
- TypeScript
- Tailwind CSS
- ShadCN UI
- React Hook Form
- Zod
- React Query
- Axios
- React Toastify
- React Router DOM

---
