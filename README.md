# Library Management API

A **Library Management System API** built with **Express**, **TypeScript**, and
**MongoDB**.  
This project allows you to manage books, borrow them, and track borrowed book
summaries.  
It includes **validation, business logic, aggregation pipelines, middleware, and
proper error handling**.

---

## 🛠 Tech Stack

- **Node.js** with **TypeScript**
- **Express.js** for REST API
- **MongoDB** with **Mongoose**
- **CORS** enabled for frontend requests
- **ts-node-dev / tsx** for development

---

## 🚀 Features

1. **Books Management**
   - Create, read, update, delete books
   - Filtering by genre, sorting, pagination
   - Meta information for getAllBooks
2. **Borrow Management**
   - Borrow books with quantity and due date
   - Automatically updates available copies
   - Prevents borrowing if not enough copies
3. **Aggregation**
   - Summary of borrowed books with total quantity per book
4. **Validation & Error Handling**
   - Mongoose schema validation
   - Global error handler for business logic, 404s, and invalid inputs
5. **CORS**
   - Allows frontend requests (all origins allowed for development)

---

## ⚙️ Project Setup

1. **Clone the repository**

```bash
git clone https://github.com/mohammad-anar/library-mnagement-A3.git
```

```bash
cd library-mnagement-A3
```

```bash
npm install
```

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/libraryDB
```

```bash
npm run dev
```
