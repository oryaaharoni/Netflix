import Header from '../../components/Shared/Header'
import "./loginHelpPassword.css";
const LoginHelpPage = () => {
  return (
    <div>
      <Header />
      <div className='centerDiv'>
        <h1>Forgot Email/Password</h1>
        <h4>How would you like to reset your password?</h4>
        <label>
          <input type='radio' name='resetMethod' />
          Email
        </label>
        <label>
          <input type='radio' name='resetMethod' />
          Text Message (SMS)
        </label>
        <h5>We will send you an email with instructions on how to reset your password.</h5>

        {/* Placeholder depends on the selected radio button */}
        <input name='email' placeholder='Enter your email or phone number' />
        <button type='submit'>Send</button>
        <a href=''>I dont remember my email or phone number</a>
      </div>
    </div>



  )
}

export default LoginHelpPage