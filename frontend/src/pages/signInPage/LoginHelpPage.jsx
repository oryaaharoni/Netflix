import Header from '../../components/Shared/Header';
import { useState } from "react";
import "./loginHelpPage.css";
import axios from 'axios';

const LoginHelpPage = () => {
  const [email, setEmail] = useState("");

  const [radioValue, setRadioValue] = useState("");

  const sendEmailHandler= async(e)=>{
    e.preventDefault();   //not render the page
    // add here- verfiy code to email

    console.log("radioValue ", radioValue)
    // add validation email
    const { data } = await axios.post("/api/v1/reset/", {
      email: email
    })
    console.log(data)
    
  }

  //get radio value
  const onChangeHandler = (e) => {
    
      setRadioValue(e.target.value);
      console.log("e.target.value ", e.target.value)
      console.log("radioValue ", radioValue)
    
  }


  return (
    <div className='div1'>
      <a className='signInLink' href='/login'>Sign-In</a>
      <Header />
      <form className='centerDiv' >
        <h1>Forgot Email/Password</h1>
        <p>How would you like to reset your password?</p>
        <div className='radioDiv'>
          <label>
            <input type='radio' name='resetMethod' value='email' onChange={onChangeHandler} />
              Email
            </label>
          <br/>
          <label>
            <input type='radio' name='resetMethod' value='sms' onChange={onChangeHandler} />
              Text Message (SMS)
          </label>
        </div>
        
        <p>We will send you an email with instructions on how to reset your password.</p>

        {/* Placeholder depends on the selected radio button */}
        <input className='emailInput' name='email' placeholder='Enter your email or phone number' onChange={(e)=>setEmail(e.target.value)} /><br/>
        <button className='loginHelpPageBtn' type='submit' onClick={sendEmailHandler}>Send</button><br/>
        <a href=''>I dont remember my email or phone number</a>
      </form>
    </div>



  )
}

export default LoginHelpPage