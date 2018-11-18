import React from 'react';
import dropdownIcon from '../../icons/arrow-drop-down.svg';


const Book = (props) => (
  <div className="book">
    <img src={props.book.imageLinks.thumbnail} alt={props.book.title} className="poster"/>
    <img src={dropdownIcon} className={'dropdown'} alt="dropdown"/>
    <select
      onChange={(event) => props.updateRead({id: event.target.id}, event.target.value)}
      defaultValue={props.book.shelf ? props.book.shelf : "none"}
      id={props.book.id}
    >
      <option disabled={true}>Move to...</option>
      <option value={"currentlyReading"}>Currently Reading</option>
      <option value={"wantToRead"}>Want to Read</option>
      <option value={"read"}>Read</option>
      <option value={"none"}>None</option>
    </select>
    <div className="authors">{props.book.authors && props.book.authors.join(', ')}</div>
  </div>
);

export default Book;