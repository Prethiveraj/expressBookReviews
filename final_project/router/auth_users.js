const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}
const SECRET_KEY = "secret_key";
//only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password must be provided" });
    }

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign({ username: username }, SECRET_KEY);

    // Optionally store token in session if you're using express-session
    req.session.authorization = {
        accessToken: token
    };

    return res.status(200).json({
        message: "Login successful",
        token: token
    });
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review
  //Write your code here
  const token =  req.headers["authorization"];
  if (!token){
    return res.status(401).json({message : "Your token is inot vaild"})
  }

  try {
    const decode = jwt.verify(token.split(" ")[1], SECRET_KEY);
    const username = decode.username;

    if (!books[isbn].review){
        books[isbn].review = {};
    }

    books[isbn].review[username] = review;

    return res.status(200).json({
        message: "You successfully added a review",
        review: books[isbn].review,    })
  }catch(err){
    return res.status(400).json({message: "review add or modify is failed"})
  }
});


regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;

    // Check if the book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Get the username from the session (assuming req.session.username exists)
    const username = req.session.username;
    if (!username) {
        return res.status(401).json({ message: "User not logged in" });
    }

    const bookReviews = books[isbn].review;

    // Check if user has a review
    if (bookReviews && bookReviews[username]) {
        // Delete the user's review
        delete bookReviews[username];
        return res.status(200).json({ message: "Review deleted successfully" });
    } else {
        return res.status(404).json({ message: "No review found for this user" });
    }
});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
