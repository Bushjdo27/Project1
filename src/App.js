import React from 'react';
import {Link} from 'react-router-dom';
import BookShelf from './Components/Bookshelf';
import Spinner from './Components/Spinner';

class BooksApp extends React.Component {
  render() {
    const {currentlyReading , wantToRead ,read ,AddBook , isLoading} = this.props;
   
    return (
       <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              
                {isLoading ? <Spinner /> :
                <div>
                  <BookShelf Title="Currently Reading" ListBooks={currentlyReading} optionState="currentlyReading" AddBook={AddBook}/>
                  <BookShelf Title="Want to Read" ListBooks={wantToRead} optionState="wantToRead" AddBook={AddBook}/>
                  <BookShelf Title="Read" ListBooks={read} optionState="read" AddBook={AddBook}/>
                </div>
              }
              
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
      </div>
      
    )
  }
}

export default BooksApp
 