import React , {Component} from 'react';
import { Route, BrowserRouter , Switch , Link} from 'react-router-dom'; 
import App from './../App'
import SearchBook from './../SearchBook'

class RouteManager extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentlyReading:[],
            wantToRead:[],
            read:[]
        }
      }

    addBook = (shelf , book)=>{
        switch(shelf.trim()){
            case 'currentlyReading':
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
                break;

            case 'wantToRead':
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
                break;

            case 'read':
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
                break;

            case 'none':
                this.setState((prevState)=>{
                    return {
                        read: prevState.currentlyReading.filter((item)=>{
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
                break;
            

            default:
            return;

        }

    }
    render(){
        const {currentlyReading , wantToRead ,read} = this.state;
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