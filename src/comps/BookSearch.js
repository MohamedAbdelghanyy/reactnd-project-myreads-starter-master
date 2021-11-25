import React, { useState } from "react"
import PropTypes from 'prop-types'
import Book from "./Book"
import { Link } from "react-router-dom"
import * as BooksAPI from '../BooksAPI'

const BookSearch =(props) => {
    let [searchBooks, setBooks] = useState([]);
    let [query, setquery] = useState("");
    const updateSearchQuery = (query) => {
        setquery(query);
        BooksAPI.search(query).then((searchResults) => {
            if(searchResults && searchResults.length > 0){
                for(let i = 0 ; i < searchResults.length ; i++){
                    for(let j = 0 ; j < props.storedBooks.length ; j++){
                        if(searchResults[i].id === props.storedBooks[j].id){
                            const bookI = props.storedBooks.findIndex((book) => book.id === searchResults[i].id);
                            searchResults[i].shelf = props.storedBooks[bookI].shelf;
                        }
                    }
                }
            }
            setBooks(searchResults);
        })
    }
    BookSearch.porpTypes = {
        storedBooks: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }
    return  (<div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input  type="text"
                                value={query}
                                onChange={(event) => updateSearchQuery(event.target.value)}
                                placeholder="Search by title or author"
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchBooks &&
                        searchBooks.length > 0 &&
                        searchBooks.map((book) => (
                            <Book
                                key={book.id}
                                onUpdateShelf={props.onUpdateShelf}
                                bookItem={book}
                            />
                        ))} 
                    </ol>
                </div>
            </div> );      
}

export default BookSearch