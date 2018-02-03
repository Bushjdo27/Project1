import React , {Component} from 'react';
import {Link} from 'react-router-dom';


class SearchBookBar extends Component{

    render(){
        const {query ,UpdateQuery} = this.props;
        return(
             <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input 
                        type="text" 
                        value={query}
                        placeholder="Search by title or author"
                        onChange={(event)=>{
                                UpdateQuery(event.target.value)
                            }}
                        />

                        </div>
                </div>
        )
    }
}

export default SearchBookBar;