import styles from "../style/SingleChapter.module.css";
import { Link } from "react-router-dom";

const SingleChapter = ({ number, bookID, bookName, chapterKey, bookKey }) => {
  return (
    <Link
      className={styles.container}
      to={{
        pathname: `/book/${bookID}/chapter/${number}`,
      }}
      state={{
        nome: bookName,
        capitolo: number,
        chapterKey: chapterKey,
        bookKey: bookKey,
      }}
    >
      <div>
        <p>Capitolo {number} </p>
      </div>
    </Link>
  );
};

export default SingleChapter;
