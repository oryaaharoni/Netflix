import "./resetPwdPage.css";
import { useRef, axios, useLocation } from '../../imports.js';
import Header from "../../components/Shared/Header.jsx";
// import Input from "../../components/Shared/Input/Input.jsx";

const ResetPwdPage = () => {

  const passwordRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("id");
  const token = searchParams.get("token");

  const passwordHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`/api/v1/reset/getNewPwd`, {
      id: userId,
      password: passwordRef.current.value,
      token: token,
      frontendHost: window.location.origin,
      frontendNavigate: 'signin',
    }).then(alert('Password changed succesfully')).catch('Failed to change the password');
    console.log(data);

    if (data.redirectUrl) {
      window.location.href = data.redirectUrl;
    }
  };

  return (
    <div className="divResetPwdContainer">
      <Header />
      <div className="resetPwdContainer">
        <form className="resetPwdForm">
          <div className="formGroup">
            {/* TODO: change to input cmponent- maybe use  */}
            <label className="formLabel">New Password: </label>
            <input className="formInput" name="password" placeholder="Enter new password" ref={passwordRef} type="password"/>
          </div>
          {/* TODO: add confirm password */}
          {/* <div className="formGroup">
            <label className="formLabel">Confirm Password: </label>
            <input className="formInput" name="confirmpassword" placeholder="Confirm new password" type="password"/>
          </div> */}
          <button className="btnReset" type="button" onClick={passwordHandler}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPwdPage