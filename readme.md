# Vite + React ToDo App

Welcome to the Vite + React ToDo App! This is a simple, modern application that leverages the power of Vite for fast development and Supabase for seamless CRUD (Create, Read, Update, Delete) operations.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [Supabase Integration](#supabase-integration)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- ⚡ **Fast Development**: Built with Vite for a blazing-fast development experience.
- 🛠️ **CRUD Operations**: Full integration with Supabase for managing ToDo items.
- 🎨 **Modern UI**: A sleek and intuitive interface with React and Tailwind CSS.
- 🌐 **Real-time Updates**: Sync your ToDo list in real-time.
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Getting Started

Follow these steps to get the project up and running on your local machine:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jatinvaira/vite-todo-app.git
   cd vite-todo-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## Supabase Integration

This app uses [Supabase](https://supabase.com/) for backend services. Supabase provides an easy-to-use interface for managing databases and authentication.
`.env` file in the root directory of your project and add the following:

```env
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_KEY=<your-supabase-api-key>
```

### CRUD Features

- **Create**: Add new tasks to your ToDo list.
- **Read**: Fetch and display tasks from the Supabase database.
- **Update**: Mark tasks as completed or edit task details.
- **Delete**: Remove tasks you no longer need.

---

## Demo

Check out the full demo of the application in action below:

[![Demo Video](https://img.youtube.com/vi/diVXzr4Zsg8/0.jpg)](https://www.youtube.com/watch?v=diVXzr4Zsg8)

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes and push the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Open a pull request.

---

Happy coding! 🚀
