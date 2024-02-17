import Header from '../../components/Shared/Header';
import { useState } from "react";
import "./loginHelpPassword.css";

const LoginHelpPage = () => {
  const [email, setEmail] = useState("");

  const sendEmailHandler= async(e)=>{
    e.preventDefault();   //not render the page
    // add here- verfiy code to email
  }

  return (
    <div className='div1'>
      <a className='signInLink' href='/login'>Sign-In</a>
      <Header />
      <div className='centerDiv'>
        <h1>Forgot Email/Password</h1>
        <p>How would you like to reset your password?</p>
        <div className='radioDiv'>
          <label>
            <input type='radio' name='resetMethod' />
              Email
            </label>
          <br/>
          <label>
            <input type='radio' name='resetMethod' />
              Text Message (SMS)
          </label>
        </div>
        
        <p>We will send you an email with instructions on how to reset your password.</p>

        {/* Placeholder depends on the selected radio button */}
        <input className='emailInput' name='email' placeholder='Enter your email or phone number' onChange={(e)=>setEmail(e.target.value)} /><br/>
        <button type='submit' onClick={sendEmailHandler}>Send</button><br/>
        <a href=''>I dont remember my email or phone number</a>
      </div>
    </div>



  )
}

export default LoginHelpPage