import React, {Component} from 'react';

const Read = (props) =>{

  return (
    <div>
      <h3>{props.title}</h3>
      <hr/>
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
  )
};

class Book extends Component{

  changeShelf = (event) => {
    console.log(event.target.id);
    console.log(event.target.value);
    this.props.updateRead({id: event.target.id}, event.target.value);
  };

  render(){
    return(
      <div>
        <img src={this.props.book.imageLinks.thumbnail} alt={this.props.book.title}/>
        <select
          onChange={this.changeShelf}
          defaultValue={this.props.book.shelf}
          id={this.props.book.id}
        >
          <option disabled={true}>Move to...</option>
          <option value={"currentlyReading"} >Currently Reading</option>
          <option value={"wantToRead"}>Want to Read</option>
          <option value={"read"} >Read</option>
          <option value={"none"} >None</option>
        </select>
        <div>{this.props.book.authors[0]}</div>
      </div>
    )
  }
};

export default Read;