# User API with MongoDB Atlas
A Node.js Express API that connects to MongoDB Atlas to manage user data. The GET `/users/:id` endpoint fetches user details for users with age > 21, targeting the 'users.users' collection. A POST `/users` endpoint allows adding new users with a JSON body containing _id, name, email, and age.
