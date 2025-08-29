import React, { useState } from "react";

function FindTheBook() {
    const [query, setQuery] = useState("");
    const[books, setBooks] = useState([]);
    const searchBooks = async () => {
        if(!query) return;
        try{
            const Response = await fetch(`https://openLibrary.org/search.json?title=${query}`)
            const data = await Response.json();
            setBooks(data.docs);
            console.log(data.docs);

        }
        catch(error){
            console.error("Error fetching books:",error);
        }
    };
  return (
    <div className=" container">
      {/* Heading */}
      <h1 className="heading">📚 Book Finder</h1>

      {/* Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
               className="search-input"

        />
        <button
          onClick={searchBooks}
          className="search-btn"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div className="results">
        {books.length > 0 ? (
          books.slice(0, 10).map((book, i) => (
            <div
              key={i}
              className="book-card"
            >
              {/* Book Cover */}
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="no-cover"
                />
              ) : (
                <div className="book-cover">
                  No Cover
                </div>
              )}

              {/* Book Details */}
              <div>
                <h2 className="book-title ">{book.title}</h2>
                <p className="book-author">
                  Author: {book.author_name ? book.author_name.join(", ") : "Unknown"}
                </p>
                <p className="book-year ">
                  First Published: {book.first_publish_year || "N/A"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">Search for books above 👆</p>
        )}
      </div>
    </div>
  );



}

export default FindTheBook;