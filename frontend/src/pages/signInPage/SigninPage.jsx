import { useState, useContext } from "react";
import axios from "axios";
import Title from "../../components/Shared/Title.jsx";
import "./signin.css";
import { Store } from "../../Store.jsx";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Shared/Header.jsx";
import Input from '../../components/Shared/Input/Input.jsx'
import { USER_SIGNIN } from "../../reducers/actions.jsx";

const SignInPage = () => {

  const [originalEmail, setOriginalEmail] = useState(""); // New state to store the original email

  // check if the user exist
  const [invalidUser, setInvalidUser] = useState(false);
  // check if the password exist
  const [invalidPassword, setInvalidPassword] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const navigate = useNavigate();

  const [changeContent, setChangeContent] = useState(true);

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const validateFunction = fieldName === 'emailOrPhone' ? emailOrPhoneValidate : passwordValidate;

    setFormData({ ...formData, [fieldName]: fieldValue });

    if (validateFunction) {
      const isValid = validateFunction(fieldValue);
      setValidationErrors({ ...validationErrors, [fieldName]: isValid ? "" : getErrorMessage(fieldName) });
    }
  };

  const getErrorMessage = (fieldName) => {
    switch (fieldName) {
      case 'emailOrPhone':
        return "Please enter a valid email.";
      case 'password':
        return "Your password must contain between 4 and 60 characters.";
      default:
        return "";
    }
  };

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    emailOrPhone: "",
    password: ""
  });

  const buttonSigninOrCode = (e) => {
    e.preventDefault();
    setChangeContent(!changeContent);
  };

  const emailOrPhoneValidate = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const passwordValidate = (password) => {
    return password.length > 3 && password.length < 61;
  };

  const submitByPwdHandler = async (e) => {
    // TODO: get the login form
    e.preventDefault();
    setOriginalEmail(formData.emailOrPhone);

    // Trigger validation for both emailOrPhone and password
    handleChange({ target: { name: 'password', value: formData.password } });
    handleChange({ target: { name: 'emailOrPhone', value: formData.emailOrPhone } });


    if (validationErrors.emailOrPhone === "" && validationErrors.password === "" && formData.emailOrPhone !== "" && formData.password !== "") {
      try {
        const { data } = await axios.post("/api/v1/users/signin", {
          email: formData.emailOrPhone,
          password: formData.password
        })
        ctxDispatch({ type: USER_SIGNIN, payload: data });

        navigate('/');

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
  }

  return (
    <div className="headDiv">
      <Header />
      <Title title="signin"></Title>
      <form className="signInForm">
        <h1>Sign In</h1>
        <br />
        {invalidPassword && <div className="invalidDiv"> <strong>Incorrect password for <br />{originalEmail}</strong> <br />
          You can <a href="/signIn">use a sign-in code</a>, <a>reset your password</a> or try again.</div>}

        {invalidUser && <div className="invalidDiv"><strong>Something went wrong </strong><br />We couldnt send a sign-in code to {originalEmail}. Please <br /> <a onClick={buttonSigninOrCode}>use your password</a> or try again.</div>}

        <Input
          className="signInInput"
          error={validationErrors.emailOrPhone}
          onChange={handleChange}
          name="emailOrPhone"
          placeholder="Email or phone number"
          isRequired={true}
        />
        {changeContent && (
          <Input
            className="signInInput"
            error={validationErrors.password}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            type={'password'}
          />
        )}

        {changeContent ?
          <button className="sendCodeBtn signIn-btn" onClick={submitByPwdHandler}>Sign-In</button> :
          <button className="sendCodeBtn signIn-btn">Send Sign-In Code</button>}

        <h3>OR</h3>
        {/* TODO: add func to login by email or phone */}
        <button className="passwordBtn signIn-btn" onClick={buttonSigninOrCode}>
          {changeContent ? "Use a Sign-In Code" : "Use Password"}
        </button>

        {/* TODO: add forgot pwd page  */}
        <a className="linkForgot" href="/forgotPwd">
          {changeContent ? "Forgot Password?" : "Forgot Email or Phone Number?"}
        </a>

        {/* TODO: add functionality to this remember box */}
        <div className="checkboxContainer">
          <input id='checkRemember' type="checkbox" name="rememberMe" />
          <label htmlFor='checkRemember'>Remember me</label>
        </div>

        <br />
        <p className="new">
          New to Netflix?{" "}
          <a className="signUpLink" href="/signup">
            Sign up now
          </a>
          .
        </p>
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* <p>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a>Learn more.</a></p> */}
      </form>
    </div>
  );
};

export default SignInPage;
