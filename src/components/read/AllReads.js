import React, {Component} from 'react';
import Read from './Read';
import {NavLink} from 'react-router-dom';
import add from '../../icons/add.svg';

const AllReads = (props) => {

  let wantToRead = [];
  let currentlyReading = [];
  let read = [];

  props.books.forEach((book) => {
    if(book.shelf === 'currentlyReading')
      currentlyReading.push(book);
    else if(book.shelf === 'wantToRead')
      wantToRead.push(book);
    else
      read.push(book);
  });

  return(
    <div>
      {props.showLoadingGif && (<div className="loading">
        <div className="loader"/>
        <div className="loadingText">loading</div>
      </div>)
      }
      <div className="navbar">MyReads</div>
      <div className="container">
        <Read title="Currently Reading" books={currentlyReading} updateRead={props.updateRead}/>
        <Read title="Want to Read" books={wantToRead} updateRead={props.updateRead}/>
        <Read title="Read" books={read} updateRead={props.updateRead}/>
        <NavLink to="/search">
          <button className={'searchIcon'}>
            <img src={add} alt="Search"/>
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default AllReads;