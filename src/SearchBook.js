import React , {Component} from 'react';
import * as BookApi from './BooksAPI';
import SearchBookBar from './Components/SearchBookBar';
import ListBooks from './Components/ListBooks';
import Spinner from './Components/Spinner';

class Test extends Component{

    constructor(props){
        super(props);
        this.state = {
            allBook:[],
            resultSearch:[],
            loading: true
        }
    }

    componentDidMount(){
        BookApi.getAll().then((listBooks)=>{
            
            this.setState({allBook:listBooks , loading:false})
        })
    }

    updateQuery = (query)=>{
        if(query.trim()){
            BookApi.search(query.trim()).then((res)=>{
                this.setState((prevState)=>{
                    return {
                        resultSearch: res
                    }
                })
            })
        }else{
            this.setState({resultSearch:[]});
        }
    }

    render(){
        const {allBook,resultSearch , loading} = this.state;
        const {currentlyReading , wantToRead ,read} = this.props;
        return (
            <div>
                <div className="search-books">
                    <SearchBookBar UpdateQuery={this.updateQuery} />
                {loading ? <Spinner /> :(
                    <div className="search-books-results">
                        <ListBooks 
                            AllBook={allBook}
                            ResultSearch={resultSearch}
                            AddBook={this.props.AddBook}
                            currentlyReading={currentlyReading}
                            wantToRead={wantToRead}
                            read={read}
                        />
                    </div>
                ) 
                }
                </div>
            </div>
        )
    }

}


export default Test;