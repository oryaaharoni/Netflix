import { useContext, useState } from "react";
import Header from "../../components/Shared/Header";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Store } from "../../Store.jsx";
import "./signup.css";

const SignUpPage = () => {

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const [showUsernameInput, setShowUsernameInput] = useState(true);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation errors when the user starts typing
    setValidationErrors({ ...validationErrors, [e.target.name]: "" });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length <= 8 && password.length > 3;
  };
  const validateUsername = (username) => {
    return username.length >= 3;
  };

  const checkUsername = () => {
    const usernameIsValid = validateUsername(formData.username);
    if (usernameIsValid) {
      setShowUsernameInput(false);
      setShowEmailInput(true);
      setShowPasswordInput(false);
      return true;
    }
    else {
      setValidationErrors({ ...validationErrors, username: "User name must be at least 3 characters long." });
      return false;
    }
  }

  const checkEmail = () => {
    const emailIsValid = validateEmail(formData.email);
    if (emailIsValid) {
      setShowUsernameInput(false);
      setShowEmailInput(false);
      setShowPasswordInput(true);
      return true;
    }
    else {
      setValidationErrors({ ...validationErrors, email: "Please enter a valid email address." });
      return false
    }
  }

  const checkPassword = () => {
    const passwordIsValid = validatePassword(formData.password);
    if (passwordIsValid) {
      setShowUsernameInput(false);
      setShowEmailInput(false);
      setShowPasswordInput(false);
      return true;
    }
    else {
      setValidationErrors({ ...validationErrors, password: "Password must be at least 4 characters long." });
      return false;
    }
  }



  const submitHandler = async (e) => {
    e.preventDefault();

    if (showUsernameInput === true) {
      checkUsername();
    }
    else if (showEmailInput === true) {
      checkEmail();
    }
    else if (showPasswordInput === true) {
      var a = checkPassword();
    }
    if (a === true) {
      try {
        const { data } = await axios.post("/api/v1/users/signup", {
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        ctxDispatch({ type: 'USER_SIGNIN', payload: data });
        navigate('/homePage');
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="rootDiv">
      <Header />
      <div className="content">
        <h1 className="title">Unlimited movies, TV shows, and more</h1>
        <h4>Watch anywhere. Cancel anytime.</h4>
        <h4>Ready to watch? Enter your password to create or restart your membership.</h4>
        <form onSubmit={submitHandler}>
          <div>

            {showUsernameInput &&
              <input
                className="signUpInput"
                name="username"
                placeholder="User Name"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
              />
            }
            {showEmailInput &&
              <input
                className="signUpInput"
                name="email"
                placeholder="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            }
            {showPasswordInput &&
              <input
                className="signUpInput"
                name="password"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            }

            <button type="submit" className="submitBtn">
              Get Started &gt;
            </button>
          </div>
          <div>
            {validationErrors.username && <p className="error">{validationErrors.username}</p>}
            {validationErrors.email && <p className="error">{validationErrors.email}</p>}
            {validationErrors.password && <p className="error">{validationErrors.password}</p>}
          </div>
        </form>
      </div>

      <div>
        Are you Ready To See The WEBSITE?????????
      </div>
    </div>
  );
};

export default SignUpPage;