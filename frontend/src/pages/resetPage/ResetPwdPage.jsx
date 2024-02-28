import axios from "axios"
import { useRef } from "react"

const ResetPwdPage = () => {

    const passwordRef = useRef(null)

    const passwordHandler = async () => {
        console.log(passwordRef.current.value);
        const { data } = await axios.post("/api/v1/reset/", {
            password: passwordRef.current.value
          })
          console.log(data)
    }

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