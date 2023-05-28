import React, { useState } from "react";

function BookItem({ book, onAddToCart }) {
  const [quantity, setQuantity] = useState(0);

  const addToCart = () => {
    if (quantity > 0) {
      onAddToCart(book, quantity);
      setQuantity(0);
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(value >= 0 ? value : 0);
  };

  const token = sessionStorage.getItem("Token");
  const loggedIn = !!token; // Check if the token exists

  return (
    <div key={book.title}>
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Quantity: {book.quantity}</p>
      {loggedIn && (
        <div>
          <button onClick={() => setQuantity(quantity - 1)}>-</button>
          <input
            type="number"
            min="0"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
          <button onClick={addToCart}>Order</button>
        </div>
      )}
    </div>
  );
}

export default BookItem;

