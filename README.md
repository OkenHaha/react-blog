![swoc2024 Banner](./swoc.jpg)

# React Blog - Social Winter of Code 2024 🌟

Welcome to **React Blog**, an exciting application selected for **Social Winter of Code 2024** (SWOC-2024)!

This project is an open-source initiative aimed at building a robust and feature-rich blogging platform. We welcome contributors from all backgrounds to collaborate and make this project a success. If you like what you see, please consider giving this repository a **star**! 💥

---

## Features 🔄

- User authentication and authorization
- Create, edit, and delete blog posts
- Search and filter blogs
- Real-time updates with modern React and MongoDB integration

---

## Tools Used 🛠️

| Tool        |
| ----------- |
| TailwindCSS |
| ExpressJS   |
| ReactJS     |
| MongoDB     |
| NodeJS      |

---

## Getting Started ⚡

Follow these steps to set up the project locally:

### Prerequisites ⚙

Ensure you have the following installed:

- **Node.js** (version 14.0 or higher recommended)
- **MongoDB** (for the database)

### Installation Steps 🔍

1. Clone the repository:

   ```bash
   git clone https://github.com/OkenHaha/react-blog.git
   ```

2. Navigate into the project directory:

   ```bash
   cd react-blog
   ```

3. Install dependencies for both frontend and backend:

   ```bash
   cd front-end
   npm install

   cd ../back-end
   npm install
   ```

4. Set up the database connection:

   - Copy your MongoDB connection URL.
   - Create a `.env` file in the `back-end` directory.
   - Add the following line to the `.env` file:

5. Set up the `.env` file:

   - Navigate to the `back-end` directory.
   - Create a `.env` file.
   - Add the following environment variables to the `.env` file:

     ```env
     CONNECTION_URL="your-mongodb-connection-url"
     PORT=8080
     JWT_SECRET="your-jwt-secret"
     SECRET_KEY="your-secret-key"
     MAIL_HOST="smtp.gmail.com"
     MAIL_USER="your-email@example.com"
     MAIL_PASS="your-email-passkey"
     ```

   - Example for local testing:
     ```env
     CONNECTION_URL="mongodb://localhost:27017"
     PORT=8080
     JWT_SECRET="test-secret"
     SECRET_KEY="test-secret-key"
     MAIL_HOST="smtp.gmail.com"
     MAIL_USER="test@example.com"
     MAIL_PASS="test-passkey"
     ```

6. Start the development server:

   ```bash
   cd back-end
   npm run dev
   ```

   This command uses **concurrently** to run both frontend and backend servers simultaneously.

7. Open the application in your browser:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

---

## Contribution Guidelines 🔧

We’re thrilled to have you contribute to this project! Please follow these steps to get started:

1. Fork the repository and clone it locally.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b your-branch-name
   ```
3. Make your changes and commit them with clear and concise commit messages.
4. Push your changes to your forked repository:
   ```bash
   git push origin your-branch-name
   ```
5. Create a pull request (PR) from your branch to the `main` branch of this repository.
6. Wait for review and feedback.

### Pro Tips 💡

- Follow the code style and standards outlined in the repository.
- Check the `CONTRIBUTING.md` file for detailed contribution rules.
- Join discussions on issues and share your ideas!

<h3>Project Contributers❤️: <h3>
<a href="https://github.com/OkenHaha/react-blog/graphs/contributors">
<img src="https://contributors-img.web.app/image?repo=OkenHaha/react-blog"/>
<a href="https://github.com/ASLawan">

## Setting up .env file.

This is a very important file and every project needs to have it. This file allows you to securely prevent  
unauthorized access to sensitive information/data which, if in the wrong hands can jeopardaize an entire project.  
This file often contains sensitive information such as:

- API keys
- Database connection strings alongside credentials in the case of mongoDB via Atlas for example
- secret keys for authentication jwt secret_key for example. and more.

The .env (**dot env**) file allows you to securely keep passwords, jasonwebtoken secret among other very important
information and only access them via environment variables.

### Requirements

To implement this file, we first need an npm package by name **dotenv** which we can get via our terminal with the following command:

```bash
npm install dotenv.

```

### Configuration

After successful installation (check in package.json file to confirm) you need to enable your project to make use of this package.
Personally I always set it up in the same file containing my express server code (assuming a MERN project);

#### Using Import

My prefered method - for this to work, your package.json file must have **"type"** variable set to **"module"**

```bash
import dotenv from 'dotenv';
```

In your sever.js file, or your preferred name and at the top:

```bash
dotenv.config();
```

#### Using Require

```bash
require('dotenv').config();
```

### Create .env file

- Create and name your file as **.env**
- Create this file at the root directory of the project (the directory where you have package.json file)

The content of your file consists of **values** assigned to **environment variables**

- Each environment variable should be all uppercase letters
- Separate multiple-word variable names with underscore
- Do not leave spaces between the variable, assignment operator and value
- No need for quotes(double or single) for the values irrespective of type (string, number)

### Environment Variables

Among the many environment variables you will be setting/declaring, is the **SECRET_KEY** variable.  
This varaible is very very important when implementing a secure login system using jsonwebtoken for **authentication** and **authorization**.  
This key is used in creating a jwt token in a process referred to as signing.  
it is also used when verifying the integrity of the created token in a verify process.  
This helps to ensure that whoever is accessing a given resource has the permission to do so.

#### Example

```bash
HOST=localhost
PORT=3000
SECRET_KEY=secretkey
```

### Accessing the variables

With the above settings you can now access your environment variables from anywhere in your project very easily as in the below example:

```bash
process.env.< environment_variable_name >

// accessing the host and port in the server.js file for example:

process.env.HOST
process.env.PORT
```

### Add this file to .gitignore file

After all is said and done, ensure that you add this file to your **.gitignore** file.  
This ensures safety and security, protecting its contents from unauthorized access.
