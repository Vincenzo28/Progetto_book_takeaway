import { useState } from "react";
import styles from "../style/Authentication.module.css";
import Mybutton from "../components/Mybutton";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../store/actions/handleAuth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);

  const dispatch = useDispatch;

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(auth(email, password, isSignup));

  };
  const changeMode = (e) => {
    e.preventDefault();
    setIsSignup(!isSignup);
  };
  return (
    <div className={styles.container}>
      <form action="">
        <p>Email</p>
        <input type="email" placeholder="Email" onChange={handleEmail} />
        <p>Password</p>
        <input
          type="password"
          placeholder="Password"
          onChange={handlePassword}
        />
        <Mybutton
          handleClick={handleSubmit}
          style={{ marginTop: "10px", width: "90%" }}
          title={isSignup ? "Signup" : "Login"}
        />
        <Mybutton
          handleClick={changeMode}
          style={{
            marginTop: "10px",
            color: "white",
            background: "black",
            width: "90%",
          }}
          title={isSignup ? "Go to Login" : "Go to Signup"}
        />
      </form>
    </div>
  );
};

export default Auth;
