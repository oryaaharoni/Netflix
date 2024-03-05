import { PropTypes, useState, axios, useContext } from '../../../imports'
import ReactPlayer from 'react-player'
import './card.css'
import { Store } from '../../../Store';
import { REMOVE_ITEM } from "../../../reducers/actions";

const Card = ({ item }) => {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [hoveredIndex, setHovered] = useState(false);

  // local storge not working
  const removeItemFromMyListHandler = async (contentId) => {
    console.log("id:", contentId)
    console.log("user info:", userInfo)
    try {
      const {data} = await axios.post(`/api/v1/content/remove/`, { userId: userInfo['_id'], contentId: contentId }, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      console.log(data)
      await ctxDispatch({ type: REMOVE_ITEM, payload: data })
        console.log(data)
    } catch (err) {
        console.log('Error in removing from list', err)
    }
  }

return (
  <div className='card-container'>
    {/* {hoveredIndex == false && */}
      <img
        src={item.img}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className='card-image'
      />
    {/* } */}
    {hoveredIndex ?
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className='card'>
        <ReactPlayer
          url={item.trailer}
          muted={true}
          playing={true}
          loop={true}
          width="300px"
          height="200px"
        />
        
        <button className="itemBtn" onClick={()=>removeItemFromMyListHandler(item._id)}><i className="fa-solid fa-minus"></i></button>
        <button className="itemBtn"><i className="fa fa-play"></i></button>
        <br/>
        <p className='pItem'><strong style={{color:"green"}}>92% match</strong> {" "}{item.duration}</p>
        <p className='pItem'>{item.genre}</p>
      </div>
      :
      null}

  </div>
)
}

Card.propTypes = { item: PropTypes.object }
export default Card