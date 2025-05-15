User API with MongoDB Atlas
A Node.js Express API that connects to MongoDB Atlas to manage user data. The API provides a GET endpoint to fetch user details for users with age greater than 21 and a POST endpoint to add new users to the users.users collection.
Overview
This project demonstrates a simple RESTful API built with Express.js and Mongoose, interfacing with a MongoDB Atlas database. It includes error handling for invalid user IDs and age-based filtering.
Prerequisites

Node.js (v14.x or later)
MongoDB Atlas account and connection string
Git (for version control)

Setup Instructions

Clone the Repository:
git clone 



Install Dependencies:
npm install

Start the Server:
node app.js

The server will run on http://localhost:3000.


Usage
Endpoints

GET /users/:id

Retrieves a user by their _id if the age is greater than 21.
Example: GET http://localhost:3000/users/682609e67bb0cab5e29a74b3
Response:
Success (200): { "_id": "682609e67bb0cab5e29a74b3", "name": "John Doe", "email": "johndoe@email.com", "age": 30 }
Not Found (404): { "message": "User not found or age is not greater than 21" }
Invalid ID (400): { "message": "Invalid user ID" }




POST /users

Adds a new user to the users.users collection.
Request Body (JSON):{
  "_id": "682609e67bb0cab5e29a74b5",
  "name": "Jane Smith",
  "email": "janesmith@email.com",
  "age": 25
}


Response:
Created (201): Returns the inserted user document.
Bad Request (400): { "message": "_id, name, email, and age are required" }
Server Error (500): { "message": "Server error" }





Testing

Use Postman or cURL to test the endpoints.
Example POST request with cURL:curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"_id":"682609e67bb0cab5e29a74b5","name":"Jane Smith","email":"janesmith@email.com","age":25}'



Project Structure

app.js: Main application file with Express server and Mongoose setup.
.env: Environment variables for MongoDB connection.

Contributing
Feel free to fork this repository, submit issues, or create pull requests for improvements.
License
This project is licensed under the MIT License.
