const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

// Define User Schema and Model
const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    name: String,
    email: String,
    age: Number,
}, { _id: false });
const User = mongoose.model("users.users", userSchema);

// GET endpoint to retrieve user by ID
app.get("/users/:id", async(req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const user = await User.findOne({ _id: userId, age: { $gt: 21 } });

        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found or age is not greater than 21" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// POST endpoint to insert a new user
app.post("/users", async(req, res) => {
    try {
        const { _id, name, email, age } = req.body;

        // Validate request body
        if (!_id || !name || !email || !age) {
            return res
                .status(400)
                .json({ message: "_id, name, email, and age are required" });
        }

        // Instantiate ObjectId with 'new'
        const newUser = new User({
            _id: new mongoose.Types.ObjectId(_id), // Corrected instantiation
            name,
            email,
            age,
        });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});