import { useState, useNavigate, axios } from "react";
import Title from "../../components/Shared/Title.jsx";
import "./signin.css";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const navigate = useNavigate();

  const [changeContent, setChangeContent] = useState(true);

  const buttonSigninOrCode = (e) => {
    e.preventDefault();
    setChangeContent(!changeContent);
  };

  const submitByPwdHandler = async (e)=>{
    // TODO: get the login form
    e.preventDefault();
    try{
      const { data }= await axios.post("/api/v1/users/signin",{
        email: email, 
        password: password
      })

      console.log(data);
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <div className="headDiv">
      <header>
        <img src="../../../public/Netflix-logo.png" width={200} alt="dsfsdlkfjsdlkf"/>
      </header>
      <Title title="signin"></Title>
      <form className="signInForm">
        <h1>Sign In</h1>
        <input className="signInInput" name="emailOrPhone" placeholder="Email or phone number" onChange={(e)=>setEmail(e.target.value)}/>
        { changeContent && ( <input className="signInInput" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>) }
        
        { changeContent ?  
        <button className="sendCodeBtn" onClick={submitByPwdHandler}>Sign-In</button> :
        <button className="sendCodeBtn">Send Sign-In Code</button> }
       
        <h3>OR</h3>
        <button className="passwordBtn" onClick={buttonSigninOrCode}>
          {changeContent ? "Use a Sign-In Code" : "Use Password"}
        </button>
       
        {/* TODO: add forgot pwd page  */}
        <a className="linkForgot" href="">
          {changeContent ? "Forgot Password?" : "Forgot Email or Phone Number?"}
        </a>

        <div>
          <input type="checkbox" name="rememberMe" />
          Remember me
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
