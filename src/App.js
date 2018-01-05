import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from "./Bookshelf.js"
import SearchBook from "./searchBook.js"
import {Link, Route} from 'react-router-dom'


class BooksApp extends React.Component {
    //books manages the state of this component. This state is passed down to other components
    state = {
        books: []
    }
    //lifecycle Event to load 
    componentDidMount() {
        this.getBooks()
    }
    //fetch call to pull all the books
    getBooks() {
        BooksAPI.getAll().then((books) => (
            this.setState({ books })
        ))
    }
    //changing the book shelf, gets called from Read.js, currentlyReading.js, wantToRead.js
    handleChange = (book, value) => {
      BooksAPI.update(book,value).then(() => {this.getBooks()})

      }
    //assign shelf for book from search and concat with books
    assignShelf = (book, value) => {
        book["shelf"] = value;
        BooksAPI.update(book,value).then(() => {this.getBooks()})
        //this.setState((state) => ({
        //    books:state.books.concat(book)
        //}))
    }
    

  render() {
    let read = this.state.books.filter((book) => book.shelf === 'read')
    let currentlyreading = this.state.books.filter((book) => book.shelf === 'currentlyReading')
    let wanttoread = this.state.books.filter((book) => book.shelf === 'wantToRead')
    return (
        <div>
            <Route exact path="/" render={() => (
                <div className="list-books">
                <div className="list-books-title">
                    <h1>My Reads</h1>
                </div>
                <div className="app">
                    <div className="list-books-content">
                        <div>
                            <Bookshelf handleChange={this.handleChange}  head='Currently Reading' books={currentlyreading}/>
                            <Bookshelf handleChange={this.handleChange}  head='Want to Read' books={wanttoread}/>
                            <Bookshelf handleChange={this.handleChange}  head='Read' books={read}/>
                        </div>

                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">click</Link>
                </div>
            </div>)}/>
            <Route path="/search" render={() => (<SearchBook books={this.state.books} assignShelf={this.assignShelf}/>)} />
        </div>
    )
  }
}

export default BooksApp
