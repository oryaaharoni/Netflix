import Header from '../../components/Shared/Header';
import "./loginHelpPage.css";
import { useState, axios } from '../../imports.js';

const LoginHelpPage = () => {
  const [email, setEmail] = useState("");

  const [optionValue, setRadioValue] = useState("");

  const sendEmailHandler = async (e) => {
    e.preventDefault();
    // add here- verfiy code to email

    // add validation email
    // const { data } = await axios.post("/api/v1/reset/", {
    //   email: email
    // }.then(alert('Email Sent Successfully')))
    // console.log(data)



    try {
      const { data } = await axios.post("/api/v1/reset/", {
        email: email
      });
      alert('Email Sent Successfully');
      console.log(data);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  const onChangeHandler = (e) => {
    setRadioValue(e.target.value);
  }

  return (
    <div className='div1'>
      <a className='signInLink' href='/signIn'>Sign-In</a>
      <Header />
      <form className='centerDiv' >
        <h1>Forgot Email/Password</h1>
        <p>How would you like to reset your password?</p>
        <div className='radioDiv'>
          <label>
            <input type='radio' name='resetMethod' value='email' onChange={onChangeHandler} />
            Email
          </label>
          <br />
          <label>
            <input type='radio' name='resetMethod' value='sms' onChange={onChangeHandler} />
            Text Message (SMS)
          </label>
        </div>

        <p>We will send you an email with instructions on how to reset your password.</p>

        {/* Placeholder depends on the selected radio button */}
        <input className='emailInput' name='email' placeholder='Enter your email or phone number' onChange={(e) => setEmail(e.target.value)} /><br />
        <button className='loginHelpPageBtn' type='submit' onClick={sendEmailHandler}>Send</button><br />
        <a className='aforgot' href=''>I dont remember my email or phone number</a>
      </form>
    </div>



  )
}

export default LoginHelpPage