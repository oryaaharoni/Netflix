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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordInput = (e) => {
    e.preventDefault(); // Prevent the default form submission
    setShowPasswordInput(!showPasswordInput);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // if (e.target.name === 'password'){

    // }

    try {
      const { data } = await axios.post("/api/v1/users/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password
      })
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });

      navigate('/homePage');

      console.log('register sucssesfully')

    }
    catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="rootDiv">
      <Header />
      <h1>Unlimited movies, TV shows, and more</h1>
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
        {showPasswordInput ? (
          <input
            className="signUpInput"
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        ) :
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

        {/* {formData.email.length < 3 ? (
          <p className="error">
            Email should be at least 15 characters long
          </p>
        ) : null} */}

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
