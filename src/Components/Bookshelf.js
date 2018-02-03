import React , {Component} from 'react';
import {Link} from 'react-router-dom';

class Bookshelf extends Component{

    renderList = (list) =>{
       const {optionState} = this.props;
        if(list.length > 0){
            return list.map((book) => { return (
                <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                <div className="book-shelf-changer">
                                    <select value={optionState} onChange={(e)=>{
                                        this.props.AddBook(e.target.value , book)
                                        }}> 
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors.join(" , ")}</div>
                    </div>
                </li>
            )}
        )

        }

        return (
            <div>
                <p>You have no book</p>
                <Link to="/search"> Add Book</Link>
            </div>
        )
      
       
    }

    render(){
        const {Title ,ListBooks} = this.props;
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{Title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.renderList(ListBooks)}
                    </ol>
                </div>
            </div>

        )
    }

}


export default Bookshelf;