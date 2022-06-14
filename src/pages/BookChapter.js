import styles from "../style/BookChapter.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux"
import {fetchBookTakeaways, createTakeaways} from "../store/actions/handleBookChapter"

const BookChapter = () => {
  const location = useLocation();
  const [inputText, setInputText] = useState("");
  useEffect(() => {
    fetchBookTakeaway();
  }, []);

  const dispatch = useDispatch()
  const takeAwayList = useSelector(state => state.chapterReducer.takeAwayList)

  const { nome, capitolo, chapterKey, bookKey } = location.state;

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };
  const fetchBookTakeaway = () => {
   dispatch(fetchBookTakeaways(bookKey, chapterKey))
  };

  const pushNewTakeAways = (e) => {
      e.preventDefault()
      dispatch(createTakeaways(bookKey, chapterKey, inputText ))
      setInputText("")
    // try {
    //   const response = await axios.put(
    //     `https://booktakeaway-d84a3-default-rtdb.firebaseio.com//booksData/${bookKey}/chapters/${chapterKey}.json`,
    //     [...takeAwayList,inputText]
    //   );
    //   await fetchBookTakeaway()
    //   setInputText("")
    // } catch (error) {
    //   console.log(error);
    // }
  };

 
  const renderTakeAways = () => {
    return takeAwayList.map((takeAway, index) => {
      return <li key={index}>{takeAway}</li>;
    });
  };

  return (
    <div className={styles.container}>
      <h2>
        {nome} - Capitolo {capitolo}
      </h2>
      <form onSubmit={pushNewTakeAways}>
        <p>Aggiungi una parte di testo</p>
        <input type="text" value={inputText} onChange={handleInputChange} />
      </form>
      <div>
        <ol>{renderTakeAways()}</ol>
      </div>
    </div>
  );
};

export default BookChapter;
