import React, { useState } from "react";
import BookList from "./bookList";
import { useNavigate } from "react-router-dom";

function GuestButton({ onGuestClick }) {
  const [showBookList, setShowBookList] = useState(false);
  const navigate = useNavigate();

  const handleGuestButtonClick = () => {
    setShowBookList(true);
    onGuestClick(); // Call the onGuestClick callback to update the loggedIn state
    navigate("/books");
  };

  return (
    <div>
      <button data-testid="book-btn" onClick={handleGuestButtonClick}>Guest</button>
      {showBookList && <BookList />}
    </div>
  );
}

export default GuestButton;