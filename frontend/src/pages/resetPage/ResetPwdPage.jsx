import "./resetPwd.css";
import { useRef, axios, useLocation } from '../../imports.js';

const ResetPwdPage = () => {

  const passwordRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("id");
  const token = searchParams.get("token");

  const passwordHandler = async (e) => {
      e.preventDefault();
      console.log('userId:', userId);
      console.log('password:', passwordRef.current.value);

      const { data } = await axios.post(`/api/v1/reset/getNewPwd`, {
          id: userId,
          password: passwordRef.current.value,
          token: token
      });
      console.log(data);

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
      
  };

  return (
    <div className="resetPwdContainer">
    <form className="resetPwdForm">
      <div className="formGroup">
        <label className="formLabel">New Password: </label>
        <input className="formInput" name="password" placeholder="Enter new password" ref={passwordRef} type="password"></input>
      </div>
      {/* <div className="formGroup">
        <label className="formLabel">Confirm Password: </label>
        <input className="formInput" name="confirmpassword" placeholder="Confirm new password" type="password"></input>
      </div> */}
      <button className="btnReset" type="button" onClick={passwordHandler}>Submit</button>
    </form>
  </div>
  )
}

export default ResetPwdPage