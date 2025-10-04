# Authentication API Documentation

This document describes the authentication-related endpoints for the Job Portal API. All endpoints are prefixed with `/api/auth`.

## Endpoints

### 1. Create Admin
- **URL:** `/api/auth/create-admin`
- **Method:** POST
- **Auth Required:** Yes (Super Admin only)
- **Body Parameters:**
  - `fullname` (string, required)
  - `email` (string, required)
  - `password` (string, required, min 6 chars)
  - `role` (string, required)
  - `isSuperAdmin` (boolean, optional)
- **Description:** Creates a new admin user. Only Super Admins can perform this action.
- **Responses:**
  - `201 Created`: Admin added successfully
  - `400 Bad Request`: Missing fields, password too short, or email already exists
  - `500 Internal Server Error`: Server error

### 2. Delete Admin
- **URL:** `/api/auth/delete-admin`
- **Method:** DELETE
- **Auth Required:** Yes (Super Admin only)
- **Body Parameters:**
  - `id` (string, required) — Admin ID to delete
- **Description:** Deletes an admin user. Super Admins cannot delete themselves.
- **Responses:**
  - `200 OK`: Deleted successfully
  - `400/401 Bad Request`: Not Super Admin, trying to delete self, or admin not found
  - `500 Internal Server Error`: Server error

### 3. Login
- **URL:** `/api/auth/login`
- **Method:** POST
- **Auth Required:** No
- **Body Parameters:**
  - `email` (string, required)
  - `password` (string, required)
- **Description:** Authenticates an admin and returns user info. Sets a JWT cookie.
- **Responses:**
  - `200 OK`: Login successful
  - `400 Bad Request`: Invalid credentials or missing fields
  - `500 Internal Server Error`: Server error

### 4. Logout
- **URL:** `/api/auth/logout`
- **Method:** POST
- **Auth Required:** No
- **Description:** Logs out the current user by clearing the JWT cookie.
- **Responses:**
  - `200 OK`: Logged out successfully
  - `500 Internal Server Error`: Server error

### 5. Check Auth
- **URL:** `/api/auth/check`
- **Method:** GET
- **Auth Required:** Yes
- **Description:** Returns the authenticated admin's details.
- **Responses:**
  - `200 OK`: Returns admin info
  - `500 Internal Server Error`: Server error

### 6. Get All Admins
- **URL:** `/api/auth/all-admins`
- **Method:** GET
- **Auth Required:** Yes
- **Description:** Returns a list of all admin users.
- **Responses:**
  - `200 OK`: Returns all admins
  - `500 Internal Server Error`: Server error

## Middleware
- **protectRoute**: Ensures the user is authenticated and attaches admin info to the request.

## Models
- **Admin**: Stores admin details including email, fullname, password (hashed), role, and isSuperAdmin flag.

## Notes
- Passwords are hashed using bcrypt before storage.
- JWT tokens are used for authentication and stored in cookies.
- Only Super Admins can create or delete other admins.

---
For further details, refer to the source code in `src/controllers/auth.controller.js`, `src/models/admin.model.js`, and `src/routes/auth.route.js`.
