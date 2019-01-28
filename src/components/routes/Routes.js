import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {getAll, update} from '../../BooksAPI';
import AllRead from '../read/AllReads';
import Search from '../search/Search';
// or whatever the location is

class Routes extends React.Component{
    state = {
      books: [],
      showLoadingGif: false
    };

    fetchBooks = () => {
      getAll().then((books) => {
        this.setState(
          {books}
        );
      }).catch(() => {
        console.log("Error fetching Books!");
      });
    }

    updateRead = (book, shelf) => {
      this.setState({
        showLoadingGif: true
      });
      update(book, shelf).then((data) => {
        this.fetchBooks();
        this.setState({
          showLoadingGif: false
        });
      }).catch((err) => {
        console.log("Error in update : ", err);
        this.setState({
          showLoadingGif: false
        });
      })
    }

    componentDidMount()
    {
      this.fetchBooks();
    }

    render(){
      return (
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" render={() => (
                <AllRead
                  showLoadingGif={this.state.showLoadingGif}
                  books={this.state.books}
                  updateRead={this.updateRead}
                />
              )} />
              <Route exact path="/search" render={() => (
                <Search
                  showLoadingGif={this.state.showLoadingGif}
                  updateRead={this.updateRead}
                  // books={this.state.books}
                />
              )} />
            </Switch>
          </div>
        </BrowserRouter>
      )
    }
  }
;

export default Routes;