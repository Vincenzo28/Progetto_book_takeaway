import styles from "../style/Results.module.css";
import SingleResult from "./SingleResult";

const Results = ({ data, savedIDs, addBook, error, loading }) => {
  const renderElement = () => {
    const myData = data.items;
    return myData.map((book) => {
      const doesExist = savedIDs.includes(book.id);
      return (
        <SingleResult
          key={book.id}
          id={book.id}
          addBook={addBook}
          error={error}
          loading={loading}
          doesExist = {doesExist}
          title={book.volumeInfo.title}
          image={book.volumeInfo.imageLinks.thumbnail}
        />
      );
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.resultsContainer}>{renderElement()}</div>
    </div>
  );
};

export default Results;
