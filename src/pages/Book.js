import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../style/Book.module.css";
import Spinner from "../components/Spinner";
import SingleChapter from "../components/SingleChapter";
import Message from "../components/Message";
import { googleBooks } from "../Axios";
import {useDispatch, useSelector} from "react-redux"
import {fetchChaptersData, createNewChapter} from "../store/actions/handleBookChapter"

const Book = () => {
  const params = useParams();
  const location = useLocation();
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inputText, setInputText] = useState("");

  const dispatch = useDispatch()
  const chapterList = useSelector(state => state.chapterReducer.chapterList)
  // useEffect per gestire caricamento dei dati
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const bookData = await googleBooks.get(`/${params.id}`);
        await setBookData(bookData.data.volumeInfo);
        await fetchChapters();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }

      // console.log(bookData.data.volumeInfo)
    };
    fetchBook();
  }, [params.id]);

  // Render dei capitoli
  const renderChapters = () => {
    const bookKey = location.state.bookKey;

    return chapterList.map((key, index) => {
      return (
        <SingleChapter
          bookName={bookData.title}
          key={key}
          chapterKey={key}
          bookKey={bookKey}
          bookID={params.id}
          chapter={4}
          number={index + 1}
        />
      );
    });
  };
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  const createNewChapters = async (e) => {
    e.preventDefault();
    const bookKey = location.state.bookKey;
    dispatch(createNewChapter(bookKey, inputText))
    setInputText("")
  };
  const fetchChapters =  () => {
    const bookKey = location.state.bookKey
    dispatch(fetchChaptersData(bookKey))
  };

  const nextChapterNumber = chapterList.length + 1;

  // Return per fare render interfaccia
  return error ? (
    <Message message="Errore di network" />
  ) : loading ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div style={{ widht: "90%" }}>
          <h2>{bookData.title}</h2>
          <h4>Data di pubblicazione: {bookData.publishedDate} </h4>
          <h4>Autore: {bookData.authors} </h4>
          <h4>Categoria: {bookData.categories} </h4>
          <h4>Descrizione: {bookData.description} </h4>
        </div>
        <img
          className={styles.image}
          src={bookData.imageLinks.thumbnail}
          alt=""
        />
      </div>
      <div className={styles.chapterContainer}>
        {renderChapters()}
        <form
          style={{ width: "85%", paddingTop: "10px" }}
          onSubmit={createNewChapters}
        >
          <input
            type="text"
            placeholder={`Aggiungi takeaway al capitolo ${nextChapterNumber}`}
            value={inputText}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
};

export default Book;
