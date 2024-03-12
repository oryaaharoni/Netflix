import ReactPlayer from "react-player"
import { Store } from "../../Store";
import { axios, useEffect, useState, useContext } from '../../imports.js';
import { useNavigate, useParams } from "react-router-dom";
import './playPage.css'

const PlayPage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [item, setItem] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {

    if (!userInfo) {
      navigate('/signin')
    }
    const getContent = async () => {
      const { data } = await axios.get("api/v1/content/getById/" + id, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });

      setItem(data);
    }

    getContent();
  }, [])

  if (!item) {
    return null
  }

  return (
    <div style={{overflow: "hidden"}}>
      <button className="playBackBtn" onClick={() => navigate(-1)}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
      <ReactPlayer url={item.movie} muted={false} controls={true} playing={true} loop={false} width="100%" height="100vh" ></ReactPlayer>
    </div>
  )
}

export default PlayPage