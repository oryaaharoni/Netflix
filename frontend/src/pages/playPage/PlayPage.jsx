import ReactPlayer from "react-player"
import { Store } from "../../Store";
import { axios, useEffect, useState, useContext, useLocation } from '../../imports.js';

const PlayPage = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [item ,setItem ]=useState();
    const location = useLocation();
    
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const id = searchParams.get('id');

      const { data }= axios.get("/getById/"+id,{
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });

      console.log("data", data)
      setItem(data);
    }, [id])
    
  return (
    <div>
        <button className="btnBack" onClick={()=>""}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
        <ReactPlayer url={item.movie} muted={false} playing={true} loop={false} width="100%" height="600px" ></ReactPlayer>
    </div>
  )
}

export default PlayPage