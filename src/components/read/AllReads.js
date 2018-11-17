import React, {Component} from 'react';
import Read from './Read';
import {getAll, update} from '../../BooksAPI';

class AllReads extends Component{
  state = {
    wantToRead: [],
    currentlyReading: [],
    read: []
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
      });
      this.setState(
        {currentlyReading, wantToRead, read}
      );
    }).catch(() => {
      console.log("Error fetching Books!");
    });
  }

  updateRead = (book, shelf) =>{
    update(book,shelf).then((data) => {
      console.log(data);
      this.fetchBooks();
    }).catch((err) => {
      console.log("Error in update : ", err);
    })
  }

  componentDidMount(){
    this.fetchBooks();
  }

  render(){
    return(
      <div>
        <h1 className="navbar">MyReads</h1>
        <Read title="Currently Reading" books={this.state.currentlyReading} updateRead={this.updateRead}/>
        <Read title="Want to Read" books={this.state.wantToRead} updateRead={this.updateRead}/>
        <Read title="Read" books={this.state.read} updateRead={this.updateRead}/>
      </div>
    )
  }
}

export default AllReads;