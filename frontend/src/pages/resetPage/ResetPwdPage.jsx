import axios from "axios"
import { useRef } from "react"
import { useLocation } from "react-router-dom";

const ResetPwdPage = () => {

  const passwordRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("id");
  const token = searchParams.get("token");

  const passwordHandler = async () => {
      console.log('userId:', userId);
      console.log('password:', passwordRef.current.value);

      const { data } = await axios.post(`/api/v1/reset/getNewPwd`, {
          id: userId,
          password: passwordRef.current.value,
          token: token
      });

      console.log(data);
  };

  return (
    <div>
      <form>
        <label>new password:</label>
        <input name="password" placeholder="enter password" ref={passwordRef} type="text"></input>
        {/* <label>confirm password:</label> */}
        {/* <input name="confirmpassword" placeholder="enter confirm password"></input> */}
        <button onClick={passwordHandler}>send</button>
      </form>
    </div>
  )
}

export default ResetPwdPage