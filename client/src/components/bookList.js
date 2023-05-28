import React, { useEffect, useState } from "react";
import BookItem from "./bookItem";
import SearchInput from "./searchInput";

function BookList({ loggedIn, onPurchase }) {
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/library/books");
      const data = await response.json();
      console.log("Received data:", data);

      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        console.warn("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSearch = (searchTerm) => {
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredBooks);
    setShowSearchResults(true);
  };

  const handleBackToAllBooks = () => {
    setSearchResults([]);
    setShowSearchResults(false);
  };


  // Skapa förfrågan till servern och uppdatera quanitity /library/users/books {"title", "quantity"}
  const handleAddToCart = (book, quantity) => {
    console.log(`Added ${quantity} ${book.title}(s) to order`);
  
    const bookIndex = books.findIndex(
      (item) => item.title === book.title && item.author === book.author
    );
  
    if (bookIndex !== -1) {
      const updatedBooks = [...books];
      const updatedBook = { ...updatedBooks[bookIndex] };
      updatedBook.quantity = Math.max(updatedBook.quantity - quantity, 0);
      updatedBooks[bookIndex] = updatedBook;
  
      setBooks(updatedBooks);
  
      // Find the book in the JSON data
      const bookData = books.find(
        (data) => data.title === book.title && data.author === book.author
      );
  
      if (bookData) {
        // Send request to save the number of books ordered
        fetch("http://localhost:3000/library/user/books", {
          method: "POST",
          headers: {
            authorization: sessionStorage.getItem("Token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: bookData.title, // Use book title as the bookId for this example
            quantity: quantity,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to save the number of books ordered.");
            }
          })
          .catch((error) => {
            console.error("Error saving the number of books ordered:", error);
            // Handle error
          });
      }
    }
  };

  return (
    <div>
      <h2>Book List</h2>
      {showSearchResults ? (
        <div>
          <button onClick={handleBackToAllBooks}>Back to All Books</button>
          {searchResults.length > 0 ? (
            searchResults.map((book) => (
              <BookItem
                key={book.title + "book"}
                book={book}
                onAddToCart={handleAddToCart}
                loggedIn={loggedIn}
                onPurchase={onPurchase}
              />
            ))
          ) : (
            <p>No search results found.</p>
          )}
        </div>
      ) : (
        <div>
          <SearchInput onSearch={handleSearch} />
          {books.length > 0 ? (
            books.map((book) => (
              <BookItem
                key={book.title + "book"}
                book={book}
                onAddToCart={handleAddToCart}
                loggedIn={loggedIn}
                onPurchase={onPurchase}
              />
            ))
          ) : (
            <p>Loading books...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BookList;