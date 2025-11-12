# Guitar Management System

A complete guitar inventory management system with user authentication and role-based access control.

## Features

- **User Authentication**: Login system with plain-text password storage
- **Role-Based Access**: Admin and Basic user roles
  - **Admin**: Can view, add, and update guitars
  - **Basic User**: Can only view guitars
- **Guitar Management**: Complete CRUD operations for guitar inventory
- **MySQL Database**: Persistent data storage
- **Bootstrap UI**: Clean and responsive interface

## Technology Stack

### Backend
- Node.js with Express.js
- MySQL database
- CORS enabled for cross-origin requests
- Port: 3001

### Frontend
- React 19.1.1
- React Router DOM 7.8.2
- Axios for API calls
- Bootstrap (Lux theme from Bootswatch)
- Port: 3000

## Database Schema

### Users Table
- `iduser` (INT, Primary Key, Auto Increment)
- `username` (VARCHAR(50), Unique, Not Null)
- `password` (VARCHAR(50), Not Null)
- `usertype` (ENUM: 'admin', 'basic', Not Null)

### Guitar Table
- `idguitar` (INT, Primary Key, Auto Increment)
- `brand` (VARCHAR(100), Not Null)
- `model` (VARCHAR(100), Not Null)
- `price` (DECIMAL(10, 2), Not Null)
- `stock` (INT, Not Null)

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Database Setup

1. Start your MySQL server
2. Run the database setup script:
```bash
mysql -u root -p < database.sql
```

Or manually execute the SQL commands in `database.sql`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure database connection (if needed):
   - Edit `index.js`
   - Update MySQL credentials:
     ```javascript
     const db = mysql.createPool({
         host: 'localhost',
         user: 'root',
         password: 'root',
         database: 'guitar_db'
     })
     ```

4. Start the backend server:
```bash
node index.js
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

### Test Credentials

**Admin User:**
- Username: `admin`
- Password: `admin123`

**Basic User:**
- Username: `basicuser`
- Password: `user123`

### User Flow

1. **Login**: Start at the login page (default route `/`)
2. **View Guitars**: After login, you'll be redirected to the guitar list view
3. **Admin Features**:
   - Click "Add Guitar" to insert new guitars
   - Select a row and click "Update Guitar" to modify existing guitars
4. **Basic User**: Can only view the guitar inventory table
5. **Logout**: Click the logout button in the navigation bar

## API Endpoints

### Authentication
- `POST /login` - Authenticate user
  - Body: `{ username, password }`
  - Response: User object with `{ iduser, username, usertype }`

### Guitar Operations
- `GET /viewguitars` - Get all guitars
- `GET /getguitar/:idguitar` - Get single guitar by ID
- `POST /insertguitar` - Add new guitar (Admin only)
  - Body: `{ brand, model, price, stock, usertype }`
- `PUT /updateguitar` - Update guitar (Admin only)
  - Body: `{ idguitar, brand, model, price, stock, usertype }`

## Project Structure

```
guitar-system/
├── backend/
│   ├── index.js           # Express server with all API endpoints
│   ├── package.json       # Backend dependencies
│   └── .gitignore
├── frontend/
│   ├── public/
│   │   └── index.html     # HTML template with Bootstrap CDN
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js       # Login page
│   │   │   ├── GuitarView.js  # View guitars table
│   │   │   ├── GuitarAdd.js   # Add guitar form
│   │   │   └── GuitarUpdate.js # Update guitar form
│   │   ├── App.js         # Router configuration
│   │   ├── Nav.js         # Navigation bar component
│   │   ├── index.js       # React entry point
│   │   ├── index.css      # Global styles
│   │   └── App.css        # App-specific styles
│   ├── package.json       # Frontend dependencies
│   └── .gitignore
├── database.sql           # Database schema and sample data
└── README.md              # This file
```

## Key Features Implementation

### Authentication
- Plain-text password storage (no hashing)
- User data stored in localStorage (`username`, `usertype`)
- No JWT tokens - usertype passed in request body

### Authorization
- Backend checks `usertype` in request body for insert/update operations
- Frontend conditionally renders UI based on stored `usertype`
- Admin-only buttons/features hidden from basic users

### Data Flow
1. User logs in → credentials checked against database
2. User data stored in localStorage
3. Protected routes check usertype before operations
4. All changes immediately reflected in MySQL database

## Design Patterns

This project follows the exact structure and patterns from:
- Backend: [technologicrod/classnode](https://github.com/technologicrod/classnode)
- Frontend: [technologicrod/classreact](https://github.com/technologicrod/classreact)

Key patterns include:
- Single `index.js` file for Express backend
- MySQL connection pool
- React Router with NavbarLayout
- Bootstrap styling (Lux theme)
- Axios with `withCredentials: true`
- Clickable table rows with highlighting
- Form structures matching reference implementation

## Notes

- This is a demonstration/educational project
- **Security Warning**: Uses plain-text password storage - NOT for production use
- No password hashing or encryption
- No JWT or session tokens
- Basic authentication implementation for learning purposes