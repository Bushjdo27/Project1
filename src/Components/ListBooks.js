import React , {Component} from 'react';

class ListBooks extends Component{

    renderList = (list) =>{
        if(list.length > 0){
            return list.map((book) => { return (
                <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks && book.imageLinks.thumbnail}")` }}></div>
                                <div className="book-shelf-changer">
                                    <select value={this.checkOptionState(book)} onChange={(e)=>{
                                        this.props.AddBook(e.target.value , book)
                                        }}> 
                                        <option value="none" disabled>Move to...</option>
                                        <option value="none" disabled>None</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                    </select>
                                </div>
                        </div>
                        <div className="book-title">{book.title && book.title}</div>
                        <div className="book-authors">{book.authors && book.authors.join(" , ")}</div>
                    </div>
                </li>
            )}
        )}
    }

    checkOptionState = (book) =>{
        const {currentlyReading , wantToRead ,read} = this.props;
        if((currentlyReading.filter(item => item.id === book.id).length > 0)){
            return "currentlyReading"
        }else if((wantToRead.filter(item => item.id === book.id)).length > 0){
            return "wantToRead"
        }else if((read.filter(item => item.id === book.id)).length > 0){
            return "read"
        }else{
            return "none"
        }

    }

    render(){
        const {AllBook , ResultSearch} = this.props;
        return(
            <ol className="books-grid">
                {ResultSearch.length > 0 ? this.renderList(ResultSearch) : this.renderList(AllBook)}
            </ol>
          
        )
    }
}

export default ListBooks;