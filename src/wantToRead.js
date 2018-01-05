import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

class WantToRead extends Component{
    render() {
        //temp var to store the filtered list of books
        let showingBooks
        showingBooks = this.props.books.filter((book) => book.shelf === 'wantToRead')

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Want To Read</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {showingBooks.map(book => (

                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select value={book.shelf} onChange={(event) => this.props.handleChange(book, event.target.value)}>
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.author}</div>
                            </div>
                        </li>

                    ))}
                </ol>
                </div>
            </div>
        )
    }

}
//Ensuring we are receving an array for books parameter
WantToRead.PropTypes = {books:PropTypes.array.isRequired}
export default WantToRead