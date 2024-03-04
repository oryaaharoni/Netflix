import { PropTypes, useState } from '../../../imports'
import ReactPlayer from 'react-player'

const Card = ({item}) => {

  const [hoveredIndex, setHovered] = useState(false);

  const removeItemFromMyListHandler = async (contentId) => {
    try {
      const {data} = await axios.post(`/api/v1/content/remove/`, { userId: userInfo['_id'], contentId: contentId }, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      await ctxDispatch({type: REMOVE_ITEM, payload: data})
      console.log(data)
    } catch (err) {
      console.log('Error in removing from list', err)
    }
  }
  return (
    <div>
      <img src={item.img} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}/>
      {hoveredIndex ? <div>
        <ReactPlayer url={item.trailer} muted={true} playing={true} loop={true} width= "200px" height="200px" />
        <button className="fa-solid fa-minus" onClick={removeItemFromMyListHandler(item._id)}></button>
        <button className="fa fa-play"></button>
        <p>hbfdvlods{" "}{item.duration}</p>
        <p>{item.genre}</p>
      </div> : null}
      
    </div>
  )
}

Card.propTypes ={item: PropTypes.object}
export default Card