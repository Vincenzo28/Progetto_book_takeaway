import styles from "../style/SingleResult.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import Message from "./Message";

const SingleResult = ({ title, image, id, doesExist, error, loading, addBook }) => {
  
  const buttonColor = doesExist ? "red"  : "black";
  return (
    <div className={styles.container}>
      <div style={{ padding: "5px", height: "70px" }}>
        <Link
          state={{ bookKey: id }}
          style={{ textDecoration: "none", color: "black" }}
          to={`book/${id}`}
        >
          <p>{title.slice(0, 50)}</p>
        </Link>
      </div>
      <img src={image} alt="" style={{ maxHeight: "180px" }} />
      
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message message="Errore di Network" />
      ) : (
        <FontAwesomeIcon
          onClick={()=>addBook(doesExist,id, title)}
          className={styles.circlePlus}
          size="2x"
          icon={faCirclePlus}
          style={{
            color: buttonColor,
            background: "white",
            borderRadius: "50%",
          }}
        />
      )}
    </div>
  );
};

export default SingleResult;
