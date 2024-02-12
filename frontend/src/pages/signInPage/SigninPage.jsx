import { useState } from "react";
import Title from "../../components/Shared/Title.jsx";
import "./signin.css"

const SigninPage = () => {
  const [changeContent, setChangeContent] = useState(true);

  const buttonSigninOrCode = (e) => {
    e.preventDefault();
    setChangeContent(!changeContent);
  };

  return (
    <div className="headDiv">
      <header>
        <img src="../../../public/Netflix-logo.png" width={200} alt="dsfsdlkfjsdlkf" />
      </header>
      <Title title="signin"></Title>
      <form className="signInForm">
        <h1>Sign In</h1>
        <input className="signInInput" name="emailOrPhone" placeholder="Email or phone number"/>
        { changeContent && (<input className="signInInput" name="password" placeholder="Password"/>) }
        <button className="sendCodeBtn"  onClick={buttonSigninOrCode}>
          {changeContent ? "Sign-In" : "Send Sign-In Code"}
        </button>
        <h3>OR</h3>
        <button className="passwordBtn" onClick={buttonSigninOrCode}>
          {changeContent ? "Use a Sign-In Code" : "Use Password"}
        </button>

        <a className="linkForgot" href="">
          {changeContent ? "Forgot Password?" : "Forgot Email or Phone Number?"}
        </a>

        <div>
          <input type="checkbox" name="rememberMe" />
          Remember me
        </div>
        <br />
        <p>New to Netflix? <a className="signUpLink" href="">Sign up now</a>.</p>
        

        {/* <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a>Learn more.</a></p> */}
      </form>
    </div>
  );
};

export default SigninPage;
