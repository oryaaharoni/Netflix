import { useState, useContext } from "react";
import axios from "axios";
import Title from "../../components/Shared/Title.jsx";
import "./signin.css";
import { Store } from "../../Store.jsx";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [originalEmail, setOriginalEmail] = useState(""); // New state to store the original email

  const [invalidUser, setInvalidUser] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [changeContent, setChangeContent] = useState(true);

  const buttonSigninOrCode = (e) => {
    e.preventDefault();
    setChangeContent(!changeContent);
  };

  const submitByPwdHandler = async (e) => {
    // TODO: get the login form
    e.preventDefault();
    setOriginalEmail(email);

    try {
      const { data } = await axios.post("/api/v1/users/signin", {
        password: password,
        email: email
      })
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });

      navigate('/homePage');

    }
    catch (error) {
      if (error.response && error.response.status === 404) {
        // Incorrect password or other error
        setInvalidUser(true);
        setInvalidPassword(false);
      } else {
        // User not found
        setInvalidUser(false);
        setInvalidPassword(true);
      }
    }
  }

  return (
    <div className="headDiv">
      <header>
        <img src="../../../public/Netflix-logo.png" width={200} alt="netflix logo" />
      </header>
      <Title title="signin"></Title>
      <form className="signInForm">
        <h1>Sign In</h1>
        {invalidPassword && <div className="invalidDiv"> <strong>Incorrect password for <br />{originalEmail}</strong> <br />
          You can <a href="/signIn">use a sign-in code</a>, <a>reset your password</a> or try again.</div>}

        {invalidUser && <div className="invalidDiv"><strong>Something went wrong </strong><br />We couldn't send a sign-in code to {originalEmail}. Please <br /> <a onClick={buttonSigninOrCode}>use your password</a> or try again.</div>}

        <input className="signInInput" name="emailOrPhone" placeholder="Email or phone number" onChange={(e) => setEmail(e.target.value)} />
        {changeContent && (<input className="signInInput" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />)}

        {changeContent ?
          <button className="sendCodeBtn" onClick={submitByPwdHandler}>Sign-In</button> :
          <button className="sendCodeBtn">Send Sign-In Code</button>}

        <h3>OR</h3>
        {/* TODO: add func to login by email or phone */}
        <button className="passwordBtn" onClick={buttonSigninOrCode}>
          {changeContent ? "Use a Sign-In Code" : "Use Password"}
        </button>

        {/* TODO: add forgot pwd page  */}
        <a className="linkForgot" href="">
          {changeContent ? "Forgot Password?" : "Forgot Email or Phone Number?"}
        </a>

        <div className="checkboxContainer">
          <input type="checkbox" name="rememberMe" />
          <label className="checkboxLabel">Remember me</label>
        </div>

        <br />
        <p>
          New to Netflix?{" "}
          <a className="signUpLink" href="/signup">
            Sign up now
          </a>
          .
        </p>

        {/* <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a>Learn more.</a></p> */}
      </form>
    </div>
  );
};

export default SignInPage;
