import Header from '../../components/Shared/Header'

const LoginHelpPage = () => {
  return (
    <div>
        <Header></Header>
        <div>
            <h1>Forgot Email/Password</h1>
            <h4>How would you like to reset your password?</h4>
            <input type='radio'>Email</input>
            <input type='radio'>Text Message (SMS)</input>
            <h5>We will send you an email with instructions on how to reset your password.</h5>

            {/* TODO: add ternary in the placeholder - if else the radiobutton click */}
            <input name='email' placeholder='name@example.com'></input>
            <button type='submit'>Email Me</button>
            <a href=''>i don &apos t remember my email or phone number</a>
        </div>

        </div>
  )
}

export default LoginHelpPage