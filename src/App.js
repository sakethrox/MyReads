import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Read from './Read.js'
import WantToRead from "./wantToRead.js";
import CurrentlyReading from "./currentlyReading.js"
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
        this.setState((state) => ({
            books:state.books.concat(book)
        }))
    }

  render() {
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
                            <CurrentlyReading handleChange={this.handleChange} books={this.state.books}/>
                            <WantToRead handleChange={this.handleChange} books={this.state.books}/>
                            <Read handleChange={this.handleChange} books={this.state.books}/>
                        </div>

                    </div>
                </div>
                <div className="open-search">
                    <Link to="/create">click</Link>
                </div>
            </div>)}/>
            <Route path="/create" render={() => (<SearchBook assignShelf={this.assignShelf}/>)} />
        </div>
    )
  }
}

export default BooksApp
