import React, {Component} from 'react';
import {update} from "../../BooksAPI";
import {search} from "../../BooksAPI";
import Book from '../read/Book';
import arrowBack from '../../icons/arrow-back.svg';
import {NavLink} from 'react-router-dom';

class Search extends Component{

  state = {
    books : [],
    placeholder: "Write one or more keywords above to start searching.",
    showLoadingGif: false
  }

  updateRead = (book, shelf) =>{
    this.setState({
      showLoadingGif: true
    });
    update(book,shelf).then((data) => {
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

  updateState = (books, placeholder) => {
    this.setState({
      books,
        placeholder
    }, () => {
      console.log(this.state.books);
    });
  }

  searchBook = (event) => {
    if(event.target.value.length === 0){
      this.updateState([], "Write one or more keywords above to start searching.");
    }else {
      search(event.target.value).then((data) => {
        if (!data.error) {
          this.updateState(data,"No results found. Try different keywords.");
        } else {
          this.updateState(data,"No results found. Try different keywords.");
        }
      }).catch((err) => {
        console.log(event.target.value.length);
        console.log("Error in Searching.");
      });
    }
  }

  render(){
    return(
      <div>
        {this.state.showLoadingGif && (<div className="loading">
          <div className="loader"/>
          <div className="loadingText">loading</div>
        </div>)
        }
        <div className="searchHeader">
          <NavLink to={"/"}>
            <img src={arrowBack} className="backBtn" alt="backArrow"/>
          </NavLink>
          <input type="text" placeholder="Search by Title or Author" onChange={this.searchBook} className="search"/>
        </div>
        <div className="books">
          {
            this.state.books.length <= 0 ?
              <h2 className="placeholder">{this.state.placeholder}</h2> :
              (
                this.state.books.map(book =>
                  <Book book={book} key={book.id} updateRead={this.updateRead}/>
                )
              )
          }
        </div>
      </div>
    );
  }
};

export default Search;