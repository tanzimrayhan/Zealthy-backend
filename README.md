# Zealthy Backend

Zealthy Backend is a Node.js and Express-based application that serves as the backend for the Zealthy project. This application handles all server-side operations, including API routing, data management, and communication with the database.

## Table of Contents

- [Zealthy Backend](#zealthy-backend)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Usage](#usage)


## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tanzimrayhan/Zealthy-backend.git
   cd Zealthy-backend
   ```
2. **Install Dependencies:**

   Make sure you have [Node JS](https://nodejs.org/en) installed
   ```bash
   npm install
   ```


## Configuration
   Create a .env file in the root directory of the project.

   The file should include necessary environment variables. For example:

   ```
   PORT= <YOUR_PORT>
   MONGODB_URI= <YOUR_MONGO_CONNECTION_URI>
   ```

## Usage
   Run the development server:

   ```
   node index.js
   ```
   The server will start on the specified port in .env. You can access the API at http://localhost:**YOUR_PORT**.


