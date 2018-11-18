import React, {Component} from 'react';
import Read from './Read';
import {getAll, update} from '../../BooksAPI';
import {NavLink} from 'react-router-dom';
import add from '../../icons/add.svg';

class AllReads extends Component{
  state = {
    wantToRead: [],
    currentlyReading: [],
    read: [],
    showLoadingGif: false
  };

  fetchBooks = () => {
    let wantToRead = [];
    let currentlyReading = [];
    let read = [];

    getAll().then((books) => {
      books.forEach((book) => {
        if(book.shelf === 'currentlyReading')
          currentlyReading.push(book);
        else if(book.shelf === 'wantToRead')
          wantToRead.push(book);
        else
          read.push(book);
        this.setState({
          showLoadingGif: false
        });
      });
      this.setState(
        {currentlyReading, wantToRead, read}
      );
    }).catch(() => {
      console.log("Error fetching Books!");
    });
  }

  updateRead = (book, shelf) =>{
    this.setState({
      showLoadingGif: true
    });
    update(book,shelf).then((data) => {
      this.fetchBooks();
    }).catch((err) => {
      console.log("Error in update : ", err);
      this.setState({
        showLoadingGif: false
      });
    })
  }

  componentDidMount(){
    this.fetchBooks();
  }

  render(){
    return(
      <div>
        {this.state.showLoadingGif && (<div className="loading">
          <div className="loader"/>
          <div className="loadingText">loading</div>
        </div>)
        }
        <div className="navbar">MyReads</div>
        <div className="container">
          <Read title="Currently Reading" books={this.state.currentlyReading} updateRead={this.updateRead}/>
          <Read title="Want to Read" books={this.state.wantToRead} updateRead={this.updateRead}/>
          <Read title="Read" books={this.state.read} updateRead={this.updateRead}/>
          <NavLink to="/search" read={this.state.name}>
            <button className={'searchIcon'}>
              <img src={add} alt="Search"/>
            </button>
          </NavLink>
        </div>
      </div>
    )
  }
}

export default AllReads;