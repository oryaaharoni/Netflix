import { useContext, useState } from "react";
import Header from "../../components/Shared/Header";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Store } from "../../Store.jsx";
import "./signup.css";

const SignUpPage = () => {

  const { state, dispatch: ctxDispatch } = useContext(Store);

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

  const togglePasswordInput = (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (validateEmail(formData.email)) {
      setShowPasswordInput(!showPasswordInput);
    }
    else{
      setValidationErrors({ ...validationErrors, email: "Please enter a valid email address." });
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length <= 8 && password.length > 3;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const emailIsValid = validateEmail(formData.email);
    const passwordIsValid = validatePassword(formData.password);

    if (!emailIsValid) {
      setValidationErrors({ ...validationErrors, email: "Please enter a valid email address." });
    }
    else if (!passwordIsValid) {
      setValidationErrors({ ...validationErrors, password: "Password must be at least 4 characters long." });
    }
    else {
      try {
        const { data } = await axios.post("/api/v1/users/signup", {
          username: formData.username,
          email: formData.email,
          password: formData.password
        });
        ctxDispatch({ type: 'USER_SIGNIN', payload: data });
        navigate('/homePage');
        console.log('register successfully');
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="rootDiv">
      <Header />
      <h1 className="title">Unlimited movies, TV shows, and more</h1>
      <h4>Watch anywhere. Cancel anytime.</h4>
      <h4>Ready to watch? Enter your password to create or restart your membership.</h4>
      <form onSubmit={submitHandler}>
        <input
          className="signUpInput"
          name="username"
          placeholder="User Name"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />
        {validationErrors.username && <p className="error">{validationErrors.username}</p>}
        {showPasswordInput ? (
          <div>
            <input
              className="signUpInput"
              name="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {validationErrors.password && <p className="error">{validationErrors.password}</p>}
          </div>
        ) :
          <div>
            <input
              className="signUpInput"
              name="email"
              placeholder="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {validationErrors.email && <p className="error">{validationErrors.email}</p>}
          </div>
        }

        {
          showPasswordInput === false ?
            <button type="button" onClick={togglePasswordInput} className="getAddressBtn">
              Get Started
            </button> :
            <button type="submit" className="getAddressBtn">
              Get Started
            </button>
        }
      </form>
    </div>
  );
};

export default SignUpPage;