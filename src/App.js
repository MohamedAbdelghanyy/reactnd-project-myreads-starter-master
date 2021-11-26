import React from 'react'
import Book from './comps/Book'
import SearchBooks from './comps/SearchBooks'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import './App.css'

class BooksApp extends React.Component {

  state = {
    ref: true,
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books: books});
    })
  }

  changeShelf = (book, shelf) => {
    let bookIndex = this.state.books.findIndex((bookX) => bookX.id === book.id)
    let bookList = this.state.books
    if(bookIndex === -1){
      book.shelf = shelf
      bookList.push(book)
    }else{
      bookList[bookIndex].shelf = shelf
    }
    this.setState({books: bookList});
    BooksAPI.update(book, shelf)
    const cRef = this.state.ref;
    this.setState({ref: !cRef});
  }

  render(){
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
                            {this.state.books.filter((book) => book.shelf === "currentlyReading").map((book) => (
                            <Book  
                                key={book.id}
                                onShelfChange={this.changeShelf}
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
                            {this.state.books.filter((book) => book.shelf === "wantToRead").map((book) => (
                            <Book  
                                key={book.id}
                                onShelfChange={this.changeShelf}
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
                            {this.state.books.filter((book) => book.shelf === "read").map((book) => (
                            <Book  
                                key={book.id}
                                onShelfChange={this.changeShelf}
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
              allBooks={this.state.books}
              onShelfChange={this.changeShelf}
            />
          } />
          </Routes>
      </div>
    );
  }
}

export default BooksApp