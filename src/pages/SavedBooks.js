import { useEffect, useState } from "react";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchSavedBooks } from "../store/actions/handleBookData";
import { Link } from "react-router-dom";
const SavedBooks = () => {
  const bookData = useSelector((state) => state.bookReducer.savedBooks);
  const loading = useSelector((state) => state.bookReducer.loading);
  const error = useSelector((state) => state.bookReducer.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSavedBooks());
  }, []);

  const renderBookItem = (book) => {
    return (
      <div
        key={book.id}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "grey",
          marginBottom: "20px",
        }}
      >
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: `/book/${book.id}`,
          }}
          state={{ bookKey: book.key }}
        >
          <p style={{ color: "white" }}>{book.title}</p>
        </Link>
      </div>
    );
  };

  const renderListBooks = () => {
    return bookData.map((item) => {
      return renderBookItem(item);
    });
  };
  return (
    <div
      style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px" }}
    >
      <h2>I miei libri</h2>
      {error ? (
        <Message message="Errore di network" />
      ) : loading ? (
        <Spinner />
      ) : (
        renderListBooks()
      )}
    </div>
  );
};

export default SavedBooks;
