import React from 'react';
import Book from './Book';

const Read = (props) =>{

  return (
    <div>
      <h3>{props.title}</h3>
      <hr/>
      <div className="books">
        {
          props.books.length < 0 ?
            <div>(empty bookSelf)</div> :
            (
              props.books.map(book =>
                <Book book={book} key={book.id} updateRead={props.updateRead}/>
              )
            )
        }
      </div>
    </div>
  )
};

export default Read;