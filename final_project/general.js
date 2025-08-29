const axios = require("axios");

const BASE_URL = "https://pprethiveraj-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai";

async function getBooks() {
    try {
        const res = await axios.get(`${BASE_URL}/`);
        console.log("All Books:", res.data);
    } catch (err) {
        console.error("Error fetching books:", err.message);
    }
}

async function getBookByISBN(isbn) {
    try {
        const res = await axios.get(`${BASE_URL}/isbn/${isbn}`);
        console.log("Book by ISBN:", res.data);
    } catch (err) {
        console.error("Error fetching book by ISBN:", err.message);
    }
}

async function getBookByAuthor(author) {
    try {
        const res = await axios.get(`${BASE_URL}/author/${author}`);
        console.log("Books by Author:", res.data);
    } catch (err) {
        console.error("Error fetching books by author:", err.message);
    }
}

async function getBookByTitle(title) {
    try {
        const res = await axios.get(`${BASE_URL}/title/${title}`);
        console.log("Books by Title:", res.data);
    } catch (err) {
        console.error("Error fetching books by title:", err.message);
    }
}


