import React from "react"

const Book = (props) => {
    return (<li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{width:128, height: 192, backgroundImage:((props.bookData.imageLinks && props.bookData.imageLinks.smallThumbnail) ? `url(${props.bookData.imageLinks.smallThumbnail})` : "none")}}></div>
                <div className="book-shelf-changer">
                    <select onChange={(event) => props.onShelfChange(props.bookData, event.target.value)} value={(props.bookData.shelf ? props.bookData.shelf : "none")}>
                        <option value="move" disabled> Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{props.bookData.title}</div>
            <div className="book-authors">{(props.bookData.authors && props.bookData.authors.length > 1) ? props.bookData.authors.join(' ') : props.bookData.authors}</div>
        </div>
    </li>);
}

export default Book
