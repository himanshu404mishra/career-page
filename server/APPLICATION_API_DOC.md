# Application Management API Documentation

This document describes the endpoints for handling job applications in the Job Portal API. All endpoints are prefixed with `/api/application`.

## Endpoints

### 1. Send Application
- **URL:** `/api/application/send-application`
- **Method:** POST
- **Auth Required:** No
- **Body Parameters:**
  - `jobId` (string, required) — ID of the job to apply for
  - `fullname` (string, required)
  - `email` (string, required, must be valid email)
  - `phone` (string, required, must be 10 digits)
  - `address` (string, required, min 3 chars)
  - `resumeLink` (string, required)
- **Description:** Submits a new application for a job. Each user (by email) can apply only once per job.
- **Responses:**
  - `201 Created`: Application submitted successfully
  - `400 Bad Request`: Missing or invalid fields, already applied
  - `404 Not Found`: Job not found
  - `500 Internal Server Error`: Server error

## Validation Rules
- All fields are required.
- `email` must contain '@'.
- `phone` must be exactly 10 digits.
- `address` and `fullname` must be at least 3 characters.
- `jobId` must reference an existing job.
- Duplicate applications (same jobId and email) are not allowed.

## Models
- **Application**: Stores application details including applicant info, job reference, and resume link.
  - `fullname`, `email`, `phone`, `address`, `jobId`, `resumeLink`
- **Job**: Each job maintains a list of application IDs (`applicationIds`).

## Notes
- On successful application, the job's `applicationIds` array is updated with the new application ID.
- No authentication is required to submit an application.
- For further details, refer to the source code in `src/controllers/application.controller.js`, `src/models/application.model.js`, and `src/routes/application.route.js`.
