import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import './App.css'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component{
    //query => for search value
    //searchlist => storing the result from API call
    state = { query:'',
              searchlist:[] 
            }
    //function to handle query change, takes in 'String' as argument
    queryChange = (query) => {
        this.setState({query:query.trim()})
        if(query){BooksAPI.search(query,10).then((results) => {
            results.map((result) => result['shelf'] = 'none')
            results.forEach((book) => {
                this.props.books.forEach((book1) => {
                    if (book1.id === book.id)
                        book.shelf = book1.shelf;
                })
            })
            this.setState({ searchlist:results })
            //handling exception if incorrect query is sent.
        }).catch(error => {alert('Invalid Query!');this.setState({ searchlist:'' }) })  }
        if(query === ''){this.setState({ searchlist:'' })}  
    }
    
    render(){
        return (
                <div>
                    <Link className='close-search' to='/'>Back</Link>
                    <div className='search-books-bar'>
                        <input type='text' placeholder='Search books' onChange={(event) => this.queryChange(event.target.value)}/>
                    </div>
                    <div className="bookshelf">
                    <div className="search-books-results">
                    <ol className="books-grid">
                    {this.state.searchlist !== '' && this.state.searchlist.map(book => (
                            <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                        <select value={book.shelf} onChange={(event) => this.props.assignShelf(book, event.target.value)}>
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
                            </div>
                        </li>
                    ))}
                    </ol>
                    </div>
                    </div>
                </div>
        )
    }
}

export default SearchBook