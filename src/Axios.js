import axios from "axios";

const firebase = axios.create({
  baseURL:
    "https://booktakeaway-d84a3-default-rtdb.firebaseio.com//booksData.json",
});

const googleBooks = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/volumes",
});


export{
    firebase,
    googleBooks
}