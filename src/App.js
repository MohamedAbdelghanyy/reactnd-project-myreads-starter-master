import React from 'react'
import Book from './comps/Book'
import SearchBooks from './comps/SearchBooks'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import { useState, useEffect} from 'react'
import './App.css'


const BooksApp = () => {
  let [flip, setflip] = useState(true);
  let [books, setbooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setbooks(books);
    })
  }, []);

  const changeShelf = (book, shelf) => {
    const updateBookIndex = books.findIndex((bookX) => bookX.id === book.id)
    const updatedBookList = books

    if(updateBookIndex === -1){
      book.shelf = shelf
      updatedBookList.push(book)
    }else{
      updatedBookList[updateBookIndex].shelf = shelf
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                      <ol className="books-grid">
                          {books.filter((book) => book.shelf === "currentlyReading").map((book) => (
                          <Book  
                              key={book.id}
                              onShelfChange={changeShelf}
                              bookData={book}
                          />                        
                          ))}
                      </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                      <ol className="books-grid">
                          {books.filter((book) => book.shelf === "wantToRead").map((book) => (
                          <Book  
                              key={book.id}
                              onShelfChange={changeShelf}
                              bookData={book}
                          />                        
                          ))}
                      </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                      <ol className="books-grid">
                          {books.filter((book) => book.shelf === "read").map((book) => (
                          <Book  
                              key={book.id}
                              onShelfChange={changeShelf}
                              bookData={book}
                          />                        
                          ))}
                      </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        } />
        <Route exact path='/search' element={
          <SearchBooks
            allBooks={books}
            onShelfChange={changeShelf}
          />
        } />
        </Routes>
    </div>
  )
}

export default BooksApp