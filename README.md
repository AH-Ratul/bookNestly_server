# 📚 BookNestly — Minimal Library Management App

---

## 🚀 Live URL

Visit the live application: [BookNestly](https://booknestly.vercel.app/)

---

## 💡 About the Project

<small>
This project is a Book Management API built with <strong>Express</strong>, <strong>TypeScript</strong>, and <strong>MongoDB</strong> using Mongoose.  
It allows managing books and borrow records with proper validation, error handling, and structured API endpoints.
</small>

---

## ✨ Features

- **CRUD Operations:**
  - Create, update, delete, and fetch books
  - Make borrow requests and fetch borrow summaries

- **Validation and Error Handling:**
  - Robust validation for input likes create books, borrow books
  - Friendly error response for invalid inputs

---

## 🛠 Technology Used

- **Backend**: Node js, Express js
- **Database**: MongoDB, Mongoose
- **Others**: Typescript for type safety and better developer experience

---

## ⚙ Setup and Installation

Follow these steps to setup the application on your local machine:

**Prerequisites:**

- Node.js (v16+)
- MongoDB (local or cloud database)
- npm (comes with Node.js)

**Installation**

1. **Clone the repository**:

   ```bash
   https://github.com/AH-Ratul/bookNestly_server
   cd bookNestly_server

2. **Install dependecies**:

   ```bash
   npm install

3. **Create a .env file in the root directory: Add the following:**

   ```bash
   PORT=5100
   MONGO_URI=your-mongodb-connection-string
   NODE_ENV=development

4. **Run the application:**

   ```bash
   npm run dev

5. **Access the API locally:**

   ```bash
   http://localhost:5100/api

---

## 📋 API Documentation

**Base URL:**

```bash
https://booknestly.vercel.app/
```
---

## EndPoints

## Book Management

### 1. Create Book

  - **Method:** ```POST```
  - **Endpoint:** ``` /api/books/ ```
  - **Description:** Create book by providing details
  - **Request Body:**
     
     ```
     {
       "title": "The Theory of Everything",
        "author": "Stephen Hawking",
        "genre": "SCIENCE",
        "isbn": "9780553380163",
        "description": "An overview of cosmology and black holes.",
        "copies": 5,
        "available": true
      }
     
    - **Response:** Success
      
      ```
        {
          "success": true,
          "message": "Book Created Successfully",
          "data": {
              "title": "string",
              "author": "string",
              "genre": "string",
              "isbn": "string",
              "description": "string",
              "copies": number,
              "available": boolean,
              "_id": "string",
              "createdAt": "date",
              "updatedAt": "date",
            }
          }
      ```

      - **Response:** Failure
        ```
        {
          "success": false,
          "statusCode": 400,
          "message": "Validation error",
          "err": { object }
        }

---

### 2. Get ALl Books

  - **Method:** ```GET```
  - **EndPoint:**  ``` /api/books/ ```
     
  **Response:** Success

  ```
    {
      "success": true,
      "data": [ array of objects ]
      }
  ```

### 3. Get Book By Id

- **Method:** ```GET```
- **EndPoint:** ``` /api/books/:bookId ```

  **Response:** Success
  
    ```
      {
        "title": "string",
        "author": "string",
        "genre": "string",
        "isbn": "string",
        "description": "string",
        "copies": number,
        "available": boolean,
        "_id": "string",
        "createdAt": "date",
        "updatedAt": "date",
      }
    ```

    **Response:** Failure
    ```
      {
        "success": false,
        "statusCode": 400,
        "message": "Invalid _id: 685a3619037f71227ecfb35",
        "err": { error object }
      }
    ```

### 4. Update Book

- **Method:** ```PATCH```
- **EndPoint:** ``` /api/books/:bookId ```
- **Description:** Updates an existing book's information by its ID.
- **Request Body:**
  
    ```
    {
      "copies": 19
    }
    ```

  **Response:** Success

    ```
      {
      "success": true,
      "message": "Book updated successfully",
      "data": {
          "_id": "685a3619037f71227ecfb356",
          "title": "The Devil in the White City",
          "author": "Erik Larson",
          "genre": "HISTORY",
          "isbn": "9780553380148",
          "description": "The Devil in the White City: Murder, Magic, and Madness at the Fair That Changed America.",
          "copies": 19,
          "available": true,
          "createdAt": "2025-06-24T05:22:33.981Z",
          "updatedAt": "2025-06-24T17:47:00.938Z",
        }
      }
    ```

  **Response:** Failure
  
    ```
      {
        "success": false,
        "statusCode": 400,
        "message": "Invalid _id: 685a3619037f71227ecfb35",
        "err": { error object }
      }
    ```

### 5. Delete A Book

  - **Method:** ```DELETE```
  - **EndPoint:** ```/api/books/:bookId```
  - **Description:** Delete an existing book by its ID.

  **Response:** Success
  
  ```
    {
      "success": true,
      "message": "Book deleted successfully",
      "data": null
    }
  ```

---

## Borrow

### 1. Borrow a Book

  - **Method:** ```POST```
  - **EndPoint:** ```/api/borrow/```
  - **Description:** Create a borrow record for a specific book and quantity.
  - **Request Body:**
    
    ```
      {
        "book": "60b9f4f6e1d5a84b1c8e4b7a",
        "quantity": 2,
        "dueDate": "2025-07-15"
      }
    ```

    **Response:** Success

      ```
        {
          "success": true,
          "message": "Book borrowed successfully",
          "data": {
            "_id": "665fa3e5e0c4fa6eb070c899",
            "book": "60b9f4f6e1d5a84b1c8e4b7a",
            "quantity": 2,
            "dueDate": "2025-07-15T00:00:00.000Z",
            "createdAt": "2025-06-21T12:34:56.789Z"
          }
        }
      ```

    **Response:** Failure

    ```
        {
          "success": false,
          "statusCode": 400,
          "message": "ValidationError",
          "err": { object }
        }

### 2. Borrow Summary

  - **Method:** ```GET```
  - **EndPoint:** ```/api/borrow/```
  - **Description:** Returns a summary of all borrowed books including total quantity borrowed and basic book details (title and ISBN).

  **Response:** Success

  ```
      {
        "success": true,
        "message": "Borrowed books summary retrieved successfully",
        "data": [
          {
            "book": {
              "title": "The Theory of Everything",
              "isbn": "9780553380163"
            },
            "totalQuantity": 5
          },
          {
            "book": {
              "title": "1984",
              "isbn": "9780451524935"
            },
            "totalQuantity": 3
          }
        ]
      }
```

    
    
