import { PropTypes, useState, axios, useContext } from '../../../imports'
import ReactPlayer from 'react-player'
import './card.css'
import { Store } from '../../../Store';
import { ADD_ITEM, REMOVE_ITEM } from "../../../reducers/actions";
import { useEffect } from 'react';

const Card = ({ item }) => {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [hoveredIndex, setHovered] = useState(false);
  const [isInMyList, setIsInMyList] = useState(false);

  useEffect(() => {
    const isItemInMyList = userInfo.myList.some((i) => (
      i._id === item._id
    ))
    setIsInMyList(isItemInMyList)
  }, [userInfo.myList, item._id])


  const addToMyListHandler = async (contentId) => {
    try {
      const { data } = await axios.post(`/api/v1/content/add/`, { userId: userInfo['_id'], contentId: contentId }, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      await ctxDispatch({ type: ADD_ITEM, payload: data })
    } catch (err) {
      console.log('Error in adding to list', err)
    }
  }

  const removeItemFromMyListHandler = async (contentId) => {
    try {
      const { data } = await axios.post(`/api/v1/content/remove/`, { userId: userInfo['_id'], contentId: contentId }, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      await ctxDispatch({ type: REMOVE_ITEM, payload: data })
    } catch (err) {
      console.log('Error in removing from list', err)
    }
  }

  return (
    <div className='card-container'>
      <img
        className='card-image'
        src={item.imgThumb}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      {hoveredIndex ?
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className='cardOverlay'>
          {/* <div style={{ position: 'relative', zIndex: 1000 }}> */}
          <ReactPlayer
            url={item.trailer}
            muted={true}
            playing={true}
            loop={true}
            width="300px"
            height="200px" />
          {/* </div> */}
          <button className="cardBtn"><i className="fa fa-play"></i></button>

          {isInMyList ?
            <button className="cardBtn" onClick={() => removeItemFromMyListHandler(item._id)}><i className="fa-solid fa-minus"></i></button>
            :
            <button className='cardBtn' onClick={() => addToMyListHandler(item._id)}><i className="fa-solid fa-plus btnMylist"></i></button>
          }

          <div className='cardContent'>
            <p><strong style={{ color: "green" }}>92% match</strong> {" "}{item.duration}</p>
            <p>{item.genre}</p>
          </div>
        </div>
        :
        null}

    </div>
  )
}

Card.propTypes = { item: PropTypes.object }
export default Card