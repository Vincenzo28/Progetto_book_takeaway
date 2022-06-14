import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../style/Header.module.css";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.container}>
      <Link to="">
        <FontAwesomeIcon
          style={{ textDecoration: "none", color: "white" }}
          size="2x"
          icon={faBookOpen}
        />
      </Link>

      <div className={styles.rightContainer}>
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to="/SavedBooks"
        >
          <p style={{ marginRight: "20px", fontWeight: "bolder" }}>
            I miei libri
          </p>
        </Link>
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to="/Authentication"
        >
          <p
            style={{
              marginRight: "20px",
              fontWeight: "bolder",
              color: "black",
            }}
          >
            Log-in
          </p>
        </Link>
        <FontAwesomeIcon
          className={styles.circlePlus}
          size="2x"
          icon={faCirclePlus}
          style={{ color: "black", background: "white", borderRadius: "50%" }}
        />
      </div>
    </div>
  );
};

export default Header;
