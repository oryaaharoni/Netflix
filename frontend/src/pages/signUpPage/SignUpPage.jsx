
import Header from "../../components/Shared/Header"
import "./signup.css"

const SignUpPage = () => {
  return (
    <div>
        {/* <header>
            <img src="../../../public/Netflix-logo.png" width={200} alt="dsfsdlkfjsdlkf" />
        </header> */}

        <Header></Header>
        <h1>Unlimited movies, TV shows, and more</h1>
        <h4>Watch anywhere. Cancel anytime.</h4>
        <h4>Ready to watch? Enter your email to create or restart your membership.</h4>
        <form>
        <input className="signUpInput" name="email" placeholder="Email Address" />
        <button className="getAddressBtn">Get Started </button>
        </form>

    </div>
  )
}

export default SignUpPage