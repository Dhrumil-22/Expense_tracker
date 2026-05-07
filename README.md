# SpendWise - Full Stack Expense Tracker

A modern, full-stack personal expense tracking web application built with React, Node.js, and MongoDB.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Recharts, Lucide Icons
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

## Features

- **Auth:** Secure Signup/Login with password hashing.
- **Dashboard:** Overview of balance, income, and expenses with recent activity.
- **Transactions:** Full CRUD operations for tracking income and expenses.
- **Analytics:** Data visualization for monthly trends and category breakdown.
- **Budgets:** Set spending limits per category and track them.
- **Export:** Download your transactions as a CSV file.
- **UI:** Responsive design, Dark Mode support, and smooth transitions.

## Prerequisites

- Node.js (v16+)
- MongoDB (Local or Atlas)
- npm or yarn

## Setup Instructions

### 1. Clone or Create the Project
Ensure you have the following folder structure:
- `backend/`
- `frontend/`

### 2. Backend Configuration
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your MongoDB connection string and JWT secret.

### 3. Frontend Configuration
1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running Locally

### Start Backend
In the `backend` directory:
```bash
npm run dev
# Server will run on http://localhost:5000
```

### Start Frontend
In the `frontend` directory:
```bash
npm run dev
# App will run on http://localhost:5173
```

## Sample Data

Once logged in, you can start by:
1. Adding an income transaction (e.g., "Salary" - $5000).
2. Setting a budget for "Food" in Settings (e.g., $300).
3. Adding various expense transactions in the Transactions page to see charts update in Dashboard and Analytics.

---
Built by Gemini CLI
