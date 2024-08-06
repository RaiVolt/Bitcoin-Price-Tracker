# Bitcoin Price Tracker

**Author:** Rafael Medeiros Machado  
**Version:** 1.0.0

## Description

Bitcoin Price Tracker is a full-stack application designed to track Bitcoin prices. The project is divided into two main components:

- **Backend**: A Nest.js application located in `server/price-tracker-back`.
- **Frontend**: A Next.js application located in `ui/price-tracker-front`.

This guide will help you set up and run the project on your local machine.

## Prerequisites

- **Node.js**: Ensure you have Node.js version `18.17.0` or higher installed. You can check your Node.js version with:

  ```bash
  node -v
  ```

- NVM (Node Version Manager): To manage Node.js versions more effectively, consider using nvm.

## Installation

##### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd bitcoin-price-tracker
```

##### Step 2: Set Node.js Version (optional)

If you are using nvm, set the correct Node.js version:

```bash
nvm install
nvm use 18.17.0
```

This will ensure that you are using the Node.js version specified in the .nvmrc file.

##### Step 3: Install Dependencies

Run the following command to install all necessary dependencies for both the backend and frontend applications:

```bash
npm run install:app
```

This command uses concurrently to run both installation processes at once:

- **`install:back`**: Installs dependencies for the Nest.js backend.
- **`install:front`**: Installs dependencies for the Next.js frontend.

##### Step 4: Running the Application

After installing the dependencies, start the application with:

```bash
npm run start:app
```

This command will concurrently start both the backend and frontend:

- **`start:back`**: Starts the Nest.js backend server.
- **`start:front`**: Starts the Next.js frontend development server.

#### Accessing the Application

Once both servers are running, you can access the frontend application in your browser. By default, the Next.js application runs on http://localhost:3000. You can also access the Nest.js backend swagger documentation running on http://localhost:4001/docs (or another specified port).
