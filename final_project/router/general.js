const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
const { users } = require('./auth_users');
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const {username, password} = req.body

    if (!username || !password) {
        return res.status(400).json({message: 'username and password must be provided'})
    }

    const existUser = users.some(user => user.username === username)

    if (existUser) {
        return res.status(409).json({message: 'username already there'})
    }

    users.push({username, password})

    return res.status(200).json({ message: "User registered successfully." });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4))
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    let book = books[isbn]

    if (book){
        return res.status(200).json(book)
    }else {
        return res.status(403).json({message: "book not found"})
    }
  //Write your code here
 
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const matchingBooks = [];

    for (let key in books){
        if (books[key].author.toLowerCase() === author.toLowerCase()){
            matchingBooks.push({ isbn: key, ...books[key]})
        }
    }

    if (matchingBooks.length > 0){
        return res.status(200).json(matchingBooks)
    }else{
        return res.status(403).json({message: "book not found"})
    }
  //Write your code here
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
   const title = req.params.title;
   const bookList = Object.keys(books).map(key => {
    return {isbn: key, ...books[key]};
   })
   
   const filterBooks = bookList.filter(book => book.title.toLowerCase() === title.toLowerCase())
   
   if (filterBooks.length > 0){
    return res.status(200).json(filterBooks)
   } else {
    return res.status(403).json({message: "book not found"})
   }
  //Write your code here
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;

    if (books[isbn]){
        const review = books[isbn].review
        return res.status(200).json({review})
    }else {
        return res.status(403).json({message: "not found"});
    }
  //Write your code here
});

module.exports.general = public_users;
