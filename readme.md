# Lead Management System

The **Lead Management System** is a web-based application for managing restaurant leads, contacts, and interactions efficiently. It includes a frontend interface built with HTML, Bootstrap, and JavaScript, and a backend developed with Node.js and Express.

## Features

### Backend Features

1. **Lead Management**
   - Create and update leads with details like name, address, contact number, status, and assigned KAM.
2. **Contact Management**
   - Add contacts (name, role, phone number, and email) to specific leads.
3. **Interaction Logging**
   - Record interactions (type, date, notes, follow-up status) for leads.
4. **Search and Filter**
   - Search leads by name or address.
5. **Dashboard**
   - View pending calls and recent interactions.

### Frontend Features

- **Responsive Forms**
  - Forms to add/edit leads, contacts, and interactions.
- **Real-Time Search**
  - Search for leads dynamically using a search bar.
- **Dynamic Dashboard**
  - Displays all leads, pending calls, and recent interactions.

---

## Prerequisites

1. **Node.js** (v14+ recommended)
2. **npm** (comes with Node.js)
3. **A modern web browser** for running the frontend.

---

## Installation and Setup

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/Viraj-code/lead-management-backend.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd lead-management-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the backend server:
   ```bash
   node server.js
   ```
   The server will run at `http://localhost:3000`.

### Frontend

1. Open the frontend code in your preferred editor or host it on a server.
2. Update the `apiBaseUrl` in the `<script>` tag to match your backend URL:
   ```javascript
   const apiBaseUrl = "http://localhost:3000";
   ```
3. Open the `index.html` file in a browser.

---

## API Endpoints

### Leads

- **POST `/leads`**: Create or update a lead.
- **GET `/leads`**: Fetch all leads (with optional search).

### Contacts

- **POST `/leads/:id/contacts`**: Add a contact to a lead.

### Interactions

- **POST `/interactions`**: Add a new interaction.

### Dashboard

- **GET `/dashboard`**: Fetch dashboard data (pending calls, recent interactions).

---

## Usage

1. Open the application in a browser.
2. Use the **Lead Management** form to add or edit leads.
3. Add contacts and log interactions for the leads.
4. View and manage data dynamically on the dashboard.

---

## Future Enhancements

- User authentication for secure data access.
- Data persistence with a database (e.g., MongoDB or PostgreSQL).
- Advanced filters and analytics.

---
