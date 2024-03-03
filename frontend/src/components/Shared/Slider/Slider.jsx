import Slider from "react-slick";
import './slider.css';
import { PropTypes, axios, useState } from '../../../imports';
import React, { useContext } from 'react'
import ReactPlayer from 'react-player'
import { Store } from "../../../Store";
import { ADD_ITEM, REMOVE_ITEM } from "../../../reducers/actions";

const Slider1 = ({ data, title }) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const settings = {
    lazyLoad: "ondemand",
    slidesToShow:  5,
    slidesToScroll: 2,
    dots: false,
    infinite: true,
    speed: 200,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const convertToEmbedLink = (shortLink) => {
    const videoId = shortLink.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  }

  const addToMyListHandler = async (contentId) => {
    try {
      const {data} = await axios.post(`/api/v1/content/add/`, { userId: userInfo['_id'], contentId: contentId }, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      await ctxDispatch({type: ADD_ITEM, payload: data})
      console.log(data)
    } catch (err) {
      console.log('Error in adding to list', err)
    }
  }

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

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div>
      <p id="titleSlider">{title}</p>
      <Slider className="slider" {...settings}>
        {data.map((item, index) => (
          // enter should navigate us to description page
          <div key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
            {hoveredIndex === index ? (
              <>
                <ReactPlayer className="sliderImg" url={convertToEmbedLink(item.trailer)} muted={true} playing={true} loop={true} width="90%" height="200px" />
                <button className="fa-solid fa-plus" onClick={() => addToMyListHandler(item._id)}></button>
                <button className="fa-solid fa-minus" onClick={() => removeItemFromMyListHandler(item._id)}></button>
              </>
              // works without auto play
              //<iframe
              //  width="90%"
              //  height="100px"
              //  src={convertToEmbedLink(item.trailer)}
              //  title={`YouTube Video - ${item.title}`}
              //  frameBorder="0"
              //  allowFullScreen
              //  autoplay
              //></iframe>
            )
              :
              // add buttons: link to description page
              <img className="sliderImg" src={item.imgVertical} alt={`content ${index}`} />
            }
          </div>
        ))}
      </Slider>
    </div>
  );
};

Slider1.propTypes = { data: PropTypes.array, title: PropTypes.string };
export default Slider1;



