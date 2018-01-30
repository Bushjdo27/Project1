import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

class SearchBookBar extends Component{
    
    render(){
        const {query ,UpdateQuery} = this.props;
        const realSearchTrigger = _.debounce(UpdateQuery , 500);
        return(
             <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input 
                        type="text" 
                        value={query}
                        placeholder="Search by title or author"
                        onChange={(event)=>{
                                console.log("run when typing on input")
                                realSearchTrigger(event.target.value)
                                
                            }}
                        />

                        </div>
                </div>
        )
    }
}

export default SearchBookBar;