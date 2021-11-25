import React from 'react'
import BookShelf from './comps/BookShelf'
import BookSearch from './comps/BookSearch'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import { useState, useEffect} from 'react'
import './App.css'


const BooksApp = () => {
  let [books, setbooks] = useState([]);
  let [flip, setflip] = useState(true);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setbooks(books);
    })
  }, []);

  const updateShelf = (book, shelf) => {
    const updateIndex = books.findIndex((b) => b.id === book.id)
    const updatedBookList = books

    if(updateIndex === -1){
      book.shelf = shelf
      updatedBookList.push(book)
    }else{
      updatedBookList[updateIndex].shelf = shelf
    }

    setbooks(updatedBookList);

    BooksAPI.update(book, shelf)

    setflip(!flip);
  }

  return (
    <div className="app">
        <Routes>
        <Route exact path="/" element={
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads: A Book Tracking App</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  key="currentlyReading"
                  className="bookshelf"
                  title="Currently Reading"
                  books={books.filter((book) => book.shelf === "currentlyReading")}
                  updateShelf={updateShelf}
                />
                <BookShelf
                  key="wantToRead"
                  className="bookshelf"
                  title="Want to Read"
                  books={books.filter((book) => book.shelf === "wantToRead")}
                  updateShelf={updateShelf}
                />
                <BookShelf
                  key="read"
                  className="bookshelf"
                  title="Read"
                  books={books.filter((book) => book.shelf === "read")}
                  updateShelf={updateShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        } />
        <Route exact path='/search' element={
          <BookSearch
            storedBooks={books}
            onUpdateShelf={updateShelf}
          />
        } />
        </Routes>
    </div>
  )
}

export default BooksApp