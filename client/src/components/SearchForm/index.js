import React from "react";
import "./style.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm(props) {
  return (
    <form className="search">
      <div className="form-group">
        <input
          value={props.search}
          onChange={props.handleInputChange}
          name="user"
          list="users"
          type="text"
          className="input-style"
          placeholder="Type in a friend's email to begin"
          id="user"
        />
        <datalist id="users">
          {props.users.map(user => (
            <option value={user.email} key={user._id} />
          ))}
        </datalist>
        <button type="submit" onClick={props.handleFormSubmit} className="search-btn">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
