import React , {Component} from 'react';
import { Route, BrowserRouter , Switch , Link} from 'react-router-dom'; 
import App from './../App';
import SearchBook from './../SearchBook';
import * as BookApi from './../BooksAPI';

class RouteManager extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentlyReading:[],
            wantToRead:[],
            read:[],
            isLoading :true
        }
      }

    componentDidMount(){
        BookApi.getAll().then((books)=>{
           const arraycurrentlyReading = [];
           const arraywantToRead = [];
           const arrayread = [];

           books.map((book)=>{
               switch(book.shelf){
                     case 'currentlyReading':
                        arraycurrentlyReading.push(book);
                        break;

                    case 'wantToRead':
                    arraywantToRead.push(book);
                        break;

                    case 'read':
                    arrayread.push(book);
                        break;
                    
                    default:
                        break;
               }
               return true;
           })
           this.setState((prevState)=>{
               return{
                currentlyReading: [...prevState.currentlyReading , ...arraycurrentlyReading],
                wantToRead:[...prevState.wantToRead , ...arraywantToRead],
                read:[...prevState.read , ...arrayread],
                isLoading:false
               }
           })
        })
    }

    addBook = (shelf , book)=>{
        switch(shelf.trim()){
            case 'currentlyReading':
                BookApi.update(book , shelf).then((res)=>{
                    this.setState((prevState)=>{
                        return {
                            currentlyReading: [...prevState.currentlyReading , book],
                            wantToRead: prevState.wantToRead.filter((item)=>{
                                return item.id !== book.id
                            }),
                            read: prevState.read.filter((item)=>{
                                return item.id !== book.id
                            })
    
                        }
                    }) 
                })
                
                break;

            case 'wantToRead':
            BookApi.update(book , shelf).then((res)=>{
                this.setState((prevState)=>{
                    return {
                        wantToRead: [...prevState.wantToRead , book],
                        currentlyReading: prevState.currentlyReading.filter((item)=>{
                            return item.id !== book.id
                        }),
                        read: prevState.read.filter((item)=>{
                            return item.id !== book.id
                        }),
                        
                    }
                })
            })
                
                break;

            case 'read':
            BookApi.update(book , shelf).then((res)=>{
                this.setState((prevState)=>{
                    return {
                        read: [...prevState.read , book],
                        currentlyReading: prevState.currentlyReading.filter((item)=>{
                            return item.id !== book.id
                        }),
                        wantToRead: prevState.wantToRead.filter((item)=>{
                            return item.id !== book.id
                        })
                    }
                })
            })
                
                break;

            case 'none':
            BookApi.update(book , shelf).then((res)=>{
                this.setState((prevState)=>{
                    return {
                        read: prevState.read.filter((item)=>{
                            return item.id !== book.id
                        }),
                        currentlyReading: prevState.currentlyReading.filter((item)=>{
                            return item.id !== book.id
                        }),
                        wantToRead: prevState.wantToRead.filter((item)=>{
                            return item.id !== book.id
                        })
                    }
                })
            })
                break;
            default:
            return;

        }

    }
    render(){
        const {currentlyReading , wantToRead ,read,isLoading} = this.state;
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={()=>{
                        return(
                            <App 
                            currentlyReading={currentlyReading}
                            wantToRead={wantToRead}
                            read={read}
                            AddBook={this.addBook}
                            isLoading={isLoading}
                            />
                        )
                    }} />
                    <Route path="/search" render={()=>{
                        return (
                            <SearchBook 
                                AddBook={this.addBook}
                                currentlyReading={currentlyReading}
                                wantToRead={wantToRead}
                                read={read}
                            />
                        )
                    }}/>
                    <Route render={()=>{return (
                        <div style={{textAlign:'center'}}>
                            <p className="error">404 Error: Page not found</p>
                            <Link style={{display:'inline-block'}} to="/">Back to HomePage</Link>
                        </div>
                        )}} />
                </Switch>
            </BrowserRouter>
        )
    }
}


export default RouteManager;