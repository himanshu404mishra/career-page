# Job Management API Documentation

This document describes the endpoints for managing jobs in the Job Portal API. All endpoints are prefixed with `/api/job`.

## Endpoints

### 1. Get All Jobs
- **URL:** `/api/job/all-jobs`
- **Method:** GET
- **Auth Required:** No
- **Description:** Retrieves a list of all job postings.
- **Responses:**
  - `200 OK`: Returns all jobs
  - `500 Internal Server Error`: Server error

### 2. Post Job
- **URL:** `/api/job/post-job`
- **Method:** POST
- **Auth Required:** Yes
- **Body Parameters:**
  - `title` (string, required)
  - `description` (string, required)
  - `salary` (number, required)
  - `tags` (array of strings, required)
  - `location` (string, required)
  - `remote` (string, required; one of: Onsite, Remote, Hybrid)
  - `type` (string, required; one of: Full-time, Part-time)
  - `experienceLevel` (string, required; one of: Internship, Mid-Level, Junior, Senior)
  - `active` (boolean, optional)
- **Description:** Creates a new job posting.
- **Responses:**
  - `201 Created`: Job posted successfully
  - `400 Bad Request`: Missing or invalid fields
  - `500 Internal Server Error`: Server error

### 3. Delete Job
- **URL:** `/api/job/delete-job`
- **Method:** DELETE
- **Auth Required:** Yes
- **Body Parameters:**
  - `jobId` (string, required)
- **Description:** Deletes a job posting by its ID.
- **Responses:**
  - `200 OK`: Job deleted successfully
  - `400 Bad Request`: Missing job ID
  - `404 Not Found`: Job not found
  - `500 Internal Server Error`: Server error

### 4. Edit Job
- **URL:** `/api/job/edit-job`
- **Method:** PUT
- **Auth Required:** Yes
- **Body Parameters:**
  - `jobId` (string, required)
  - Other job fields to update (same as post job)
- **Description:** Updates an existing job posting.
- **Responses:**
  - `200 OK`: Job updated successfully
  - `400 Bad Request`: Missing job ID or required fields
  - `404 Not Found`: Job not found
  - `500 Internal Server Error`: Server error

### 5. Get Applications for a Job
- **URL:** `/api/job/get-applications`
- **Method:** GET
- **Auth Required:** Yes
- **Body Parameters:**
  - `jobId` (string, required)
- **Description:** Retrieves all applications for a specific job.
- **Responses:**
  - `200 OK`: Returns applications for the job
  - `400 Bad Request`: Missing job ID
  - `404 Not Found`: No applications found
  - `500 Internal Server Error`: Server error

## Middleware
- **protectRoute**: Ensures the user is authenticated before accessing protected endpoints.

## Models
- **Job**: Stores job details including title, description, salary, tags, location, remote status, type, experience level, active status, and application references.

## Notes
- All job fields must be valid and complete for creation and update.
- Only authenticated users can post, edit, or delete jobs, and view applications.
- Tags must be an array of strings.
- Salary must be a number.
- Remote, type, and experienceLevel fields have strict allowed values.

---
For further details, refer to the source code in `src/controllers/job.controller.js`, `src/models/job.model.js`, and `src/routes/job.route.js`.