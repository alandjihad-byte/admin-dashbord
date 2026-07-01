# Admin Dashboard

A modern React + Vite admin dashboard for managing products, users, and employees. The app provides a protected admin experience with authentication, role-based access, item management, user administration, and account settings.

## Overview

This project is a frontend admin panel that communicates with a backend API running on `http://localhost:5000`. It is designed for administrators and managers to:

- sign in to the admin console
- manage inventory items
- create, edit, and delete items with image support
- view registered users
- force logout users
- manage employee accounts and permissions
- update admin credentials and upload a profile image

## Tech Stack

- React 19
- Vite 8
- React Router DOM 7
- Axios for API calls
- ESLint for code quality

## Project Structure

```bash
src/
  App.jsx
  ProtectedRoute.jsx
  main.jsx
  pages/
    Allitems.jsx
    AllUsers.jsx
    Create.jsx
    Edit.jsx
    EditEmplyee.jsx
    Employees.jsx
    Login.jsx
    Settings.jsx
```

## Features

### Authentication
- Admin login screen at `/`
- Token stored in `localStorage` under `adminToken`
- Protected routes using `ProtectedRoute`
- Automatic redirect to login on invalid or expired sessions

### Item Management
- View all items
- Search items by name or ID
- Create new items
- Edit existing items
- Delete items
- Upload item images

### User Management
- View all users
- Force logout selected users

### Employee Management
- Create employee accounts
- Assign permissions
- Edit employee details and permissions
- Delete employee accounts
- Manager-only access to the employee page

### Settings
- View current admin email
- Update email
- Update password
- Upload profile image
- Logout

## Prerequisites

Before running this project, make sure you have:

- Node.js 18 or newer
- npm 9 or newer
- A backend API running at `http://localhost:5000`

## Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd admin-dashbord
   ```

2. Install dependencies
   ```bash
   npm install
   ```

## Available Scripts

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Application Routes

| Route | Description |
| --- | --- |
| `/` | Admin login page |
| `/items` | View and manage all items |
| `/items/create` | Create a new item |
| `/items/edit/:id` | Edit an existing item |
| `/employees` | Manage employees (manager-only) |
| `/employees/edit/:id` | Edit an employee |
| `/allusers` | View users and force logout users |
| `/settings` | Update admin settings and profile |

## Backend API Expectations

This frontend expects a backend server with the following endpoints:

### Authentication
- `POST /admin/login`
- `GET /admin/me`
- `PUT /admin/update`
- `PUT /admin/image`

### Items
- `GET /items`
- `GET /items/:id`
- `POST /items`
- `PUT /items/:id`
- `DELETE /items/:id`

### Users
- `GET /users`
- `POST /admin/force-logout/:userId`

### Employees
- `GET /admin/employees`
- `POST /admin/employees`
- `GET /admin/employees/:id`
- `PUT /admin/employees/:id`
- `DELETE /admin/employees/:id`

The frontend uses image uploads with multipart form data and expects uploaded files to be served from the backend under `/uploads`.

## Environment Notes

- The app currently uses hardcoded API URLs pointing to `http://localhost:5000`.
- If your backend runs on a different port or host, update the URLs in the page components accordingly.
- The app depends on the `adminToken` value being present in `localStorage` for authenticated requests.

## Usage Guide

1. Start the backend server.
2. Run the frontend with `npm run dev`.
3. Open the app in your browser.
4. Log in with an admin account.
5. Use the dashboard to manage items, users, and employees.

## Notes

- The employee management page is restricted to users whose stored role is `manager`.
- Invalid or expired tokens trigger an automatic logout and redirect to the login page.
- If you encounter authentication issues, ensure the backend is running and returning valid responses for the expected endpoints.

## License

This project does not currently include a license file. Add one if you plan to distribute or reuse it publicly.
