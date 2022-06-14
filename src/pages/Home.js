import { useEffect, useState } from "react";
import styles from "../style/SearchBar.module.css";
import Message from "../components/Message";
import Results from "../components/Results";
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBookData,
  getSavedBooksIDs,
  addNewBook,
} from "../store/actions/handleBookData";

function Home() {
  // const [data, setData] = useState([]);
  const [inputText, setInputText] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  const data = useSelector((state) => state.bookReducer.booksData);
  const savedIDs = useSelector((state) => state.bookReducer.savedIDs);
  const error = useSelector((state) => state.bookReducer.error);
  const loading = useSelector((state) => state.bookReducer.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSavedBooksIDs());
  }, []);

  const handleInput = (e) => {
    setInputText(e.target.value);
  };

  // Prendere dati dei libri cercati dall'utente
  const fetchData = () => {
    dispatch(fetchBookData(inputText));
  };

  // Aggiungere libro a lista libri salvati
  const addBook = async (doesExist, id, title) => {
    if (doesExist) {
      alert("Libro già salvato");

      return;
    }
    dispatch(addNewBook(id, title));
  };

  // Possibili risultati di ricerca
  const showResults = () => {
    if (data.totalItems === 0) {
      return <Message message="Ricerca senza risultati" />;
    } else if (data.length === 0) {
      return <Message message="Cerca qualcosa..." />;
    } else {
      return loading ? (
        <Spinner />
      ) : error ? (
        <Message message="Errore di network" />
      ) : (
        <Results
          error={error}
          loading={loading}
          addBook={addBook}
          savedIDs={savedIDs}
          data={data}
        />
      );
    }
  };

  return (
    <div className="App">
      <div className={styles.container}>
        <h2>Cerca un libro</h2>
        <div className={styles.bar}>
          <input
            value={inputText}
            onChange={handleInput}
            type="text"
            placeholder="Cerca..."
          />
          <button onClick={fetchData}>Cerca</button>
        </div>
      </div>
      <h1 style={{ paddingLeft: "30px" }}>Risultati</h1>
      {showResults()}
    </div>
  );
}

export default Home;
