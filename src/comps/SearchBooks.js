import React, { useState } from "react"
import Book from "./Book"
import { Link } from "react-router-dom"
import * as BooksAPI from '../BooksAPI'

const SearchBooks =(props) => {
    let [searchKey, setSearchKey] = useState("");
    let [searchBooksList, setBooksX] = useState([]);

    const APISearch = () => {
        BooksAPI.search(searchKey).then((result) => {
            if(result && result.length > 0){
                for(let i = 0 ; i < result.length ; i++){
                    for(let j = 0 ; j < props.allBooks.length ; j++){
                        if(result[i].id === props.allBooks[j].id){
                            let bookI = props.allBooks.findIndex((book) => book.id === result[i].id);
                            result[i].shelf = props.allBooks[bookI].shelf;
                        }
                    }
                }
            }
            setBooksX(result);
        })
    }
    
    const searchBooksF = (searchKey) => {
        setSearchKey(searchKey);
        APISearch();
    }

    return  (<div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to="/">Close</Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" value={searchKey} onChange={(event) => searchBooksF(event.target.value)} placeholder="Search by title or author" />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {searchBooksList && searchBooksList.length > 0 && searchBooksList.map((book) => (<Book key={book.id} onShelfChange={props.onShelfChange} bookData={book} />))} 
                        </ol>
                    </div>
                </div>);      
}

export default SearchBooks