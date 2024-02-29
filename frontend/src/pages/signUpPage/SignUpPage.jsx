import { useContext, useState, axios, useNavigate } from '../../imports.js';
import Header from "../../components/Shared/Header";
import { Store } from "../../Store.jsx";
import "./signup.css";
import Input from "../../components/Shared/Input/Input.jsx";
import { USER_SIGNIN } from "../../reducers/actions.jsx";

const SignUpPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const [inputStates, setInputStates] = useState({
    showUsernameInput: true,
    showEmailInput: false,
    showPasswordInput: false,
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationErrors({ ...validationErrors, [e.target.name]: "" });
  };

  const validateField = (fieldName, content) => {
    switch (fieldName) {
      case 'username':
        return content.length >= 3;
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(content);
      case 'password':
        return content.length <= 8 && content.length > 3;
      default:
        return false;
    }
  };

  const changeInputStates = (username, email, password) => {
    setInputStates({
      showUsernameInput: username,
      showEmailInput: email,
      showPasswordInput: password,
    });
  };

  const checkField = (fieldName) => {
    const isValid = validateField(fieldName, formData[fieldName]);
    if (isValid) {
      changeInputStates(
        // fieldName === 'username' ? false : (fieldName === 'email' ? true : inputStates.showUsernameInput),
        // fieldName === 'email' ? false : (fieldName === 'password' ? true : inputStates.showEmailInput),
        // fieldName === 'email' ? true : inputStates.showPasswordInput
        false,
        fieldName === 'username' ? true : false,
        fieldName === 'username' ? false : fieldName === 'email' ? true : fieldName === 'password' && true
      );
    } else {
      setValidationErrors({
        ...validationErrors,
        [fieldName]: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is invalid.`,
      });
    }
    return isValid;
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    let allFieldsValid = true;
    
    allFieldsValid = checkField('username') && allFieldsValid;
    allFieldsValid = checkField('email') && allFieldsValid;
    allFieldsValid = checkField('password') && allFieldsValid;


    if (allFieldsValid) {
      try {
        const { data } = await axios.post("/api/v1/users/signup", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        ctxDispatch({ type: USER_SIGNIN, payload: data });
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    }
  };
 

  return (
    <div className="rootDiv">
      <Header />
      <div className="content">
        <h1 className="title">Unlimited movies, TV shows, and more</h1>
        <h4>Watch anywhere. Cancel anytime.</h4>
        <h4>Ready to watch? Enter your password to create or restart your membership.</h4>
        <form className="formSignup" onSubmit={submitHandler}>
          <div>
            {inputStates.showUsernameInput && (
              <Input
                className="inputEle"
                name="username"
                placeholder="User Name"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required={true}
                error={validationErrors.username}
              />
            )}
            {inputStates.showEmailInput && (
              <Input
                className="inputEle"
                name="email"
                placeholder="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required={true}
                error={validationErrors.email}
              />
            )}
            {inputStates.showPasswordInput && (
              <Input
                className="inputEle"
                name="password"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required={true}
                error={validationErrors.password}
              />
            )}
          </div>
          <button type="submit" className="submitBtn">
            Get Started &gt;
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;