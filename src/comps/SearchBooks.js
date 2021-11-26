import React, { useState } from "react"
import Book from "./Book"
import { Link } from "react-router-dom"
import * as BooksAPI from '../BooksAPI'
import PropTypes from 'prop-types'

class SearchBooks extends React.Component {

    static propTypes = {
        allBooks: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    };
    
    state = {
        searchKey: '',
        searchBooksList: [],
        isErr: false
    };

    APISearch () {
        BooksAPI.search(this.state.searchKey).then((result) => {
            if(result && result.length > 0){
                for(let i = 0 ; i < result.length ; i++){
                    for(let j = 0 ; j < this.props.allBooks.length ; j++){
                        if(result[i].id === this.props.allBooks[j].id){
                            result[i].shelf = this.props.allBooks[this.props.allBooks.findIndex((book) => book.id === result[i].id)].shelf;
                        }
                    }
                }
            }
            this.setState({searchBooksList: result});
        })
    }
    
    searchBooksF(searchKey){
        this.setState({searchKey: searchKey});
        this.APISearch();
    }

    render (){
        return  (<div className="search-books">
                        <div className="search-books-bar">
                            <Link className="close-search" to="/">Close</Link>
                            <div className="search-books-input-wrapper">
                                <input type="text" value={this.state.searchKey} onChange={(event) => this.searchBooksF(event.target.value)} placeholder="Search by title or author" />
                            </div>
                        </div>
                        {this.state.searchKey.length !== 0 && (
                        <div className="search-books-results">
                            <ol className="books-grid">
                                {this.state.searchBooksList && this.state.searchBooksList.length > 0 && this.state.searchBooksList.map((book) => (<Book key={book.id} onShelfChange={this.props.onShelfChange} bookData={book} />))} 
                            </ol>
                        </div>)}
                    </div>);   
    }   
}

export default SearchBooks