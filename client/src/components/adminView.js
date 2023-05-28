import React from "react";
import { useNavigate } from "react-router-dom";
import BookList from "./bookList";
import LogOutBtn from "./logOut";




function AdminBooks({username, setUsername, setLoggedIn}) {
  const navigate = useNavigate();
  


  const handleAddNewBook = () => {
    // Logic to handle adding a new book
  };

  return (
    <div>
      <h2>Welcome Admin, {username}!</h2>
      <div>
      <LogOutBtn setUsername={setUsername} setLoggedIn={setLoggedIn} />
        <button onClick={handleAddNewBook}>Add New Book</button>
        <button onClick={() => navigate("/books")}>Books</button>
        <button onClick={() => navigate("/users")}>Users</button>
      </div>
      <BookList loggedIn={true} onPurchase={() => {}} />
    </div>
  );
}

export default AdminBooks;