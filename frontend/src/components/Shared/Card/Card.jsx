import { PropTypes, useState, axios, useContext, useNavigate } from '../../../imports.js'
import ReactPlayer from 'react-player'
import './card.css'
import { Store } from '../../../Store';
import { ADD_ITEM, REMOVE_ITEM } from "../../../reducers/actions";
import { useEffect } from 'react';

const Card = ({ item }) => {

  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [hoveredIndex, setHovered] = useState(false);
  const [isInMyList, setIsInMyList] = useState(false);

  useEffect(() => {
    if (!userInfo.myList) {
      return
    }
    const isItemInMyList = userInfo.myList.contentList.some((i) => (
      i._id === item._id
    ))
    setIsInMyList(isItemInMyList)
  }, [userInfo, item._id])


  const addToMyListHandler = (item) => {
    try {
      axios.post(`/api/v1/content/add/`, { userId: userInfo['_id'], contentId: item._id }, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      ctxDispatch({ type: ADD_ITEM, payload: item })
    } catch (err) {
      console.log('Error in adding to list', err)
    }
  }

  const removeItemFromMyListHandler = (item) => {
    try {
      axios.post(`/api/v1/content/remove/`, { userId: userInfo['_id'], contentId: item._id }, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      ctxDispatch({ type: REMOVE_ITEM, payload: item })
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
          <ReactPlayer
            url={item.trailer}
            muted={true}
            volume={0}
            playing={true}
            loop={true}
            width="300px"
            height="200px"
          />

          <button className="cardBtn" onClick={() => navigate(`/play/${item._id}`)}><i className="fa fa-play"></i></button>

          {isInMyList ?
            <button className="cardBtn" onClick={() => removeItemFromMyListHandler(item)}><i className="fa-solid fa-minus"></i></button>
            :
            <button className='cardBtn' onClick={() => addToMyListHandler(item)}><i className="fa-solid fa-plus btnMylist"></i></button>
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