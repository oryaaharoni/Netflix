import Slider from "react-slick";
import './slider.css';
import { PropTypes, axios, useState } from '../../../imports';
import { useContext } from 'react'
import ReactPlayer from 'react-player'
import { Store } from "../../../Store";
import { ADD_ITEM, REMOVE_ITEM } from "../../../reducers/actions";
import Card from "../Card/Card";

const Slider1 = ({ data, title }) => {
  // console.log("data in slider : ", data)
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const settings = {
    lazyLoad: "ondemand",
    slidesToShow: data && data.length>=5 ? 5 : 2,
    slidesToScroll: 2,
    dots: false,
    infinite: false,
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
  else{
    console.log("data.length = " , data.length)
  }


  return (
    <div>
      <p id="titleSlider">{title}</p>
      <Slider className="slider" {...settings}>
        {data.map((item, index) => (
          // enter should navigate us to description page
          <div className="divBehindCard" key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
            {hoveredIndex === index ? (
              <>
                {/* <ReactPlayer url={convertToEmbedLink(item.trailer)} muted={true} playing={true} loop={true} width={data.length >= 5 ? "90%" : "200px"} height="200px" /> */}
                <Card item={item}></Card>
                {/* <button className="fa-solid fa-plus btnMylist" onClick={() => addToMyListHandler(item._id)}></button>  */}
                {/* <button className="fa-solid fa-minus btnMylist" onClick={() => removeItemFromMyListHandler(item._id)}></button>  */}
              </>
            )
              :
              // add buttons: link to description page
              <img className={data.length >= 5 ? "sliderImg" : "smallImg"} src={item.imgThumb} alt={`content ${index}`} />
            }
          </div>
        ))}
      </Slider>
    </div>
  );
};

Slider1.propTypes = { data: PropTypes.array, title: PropTypes.string };
export default Slider1;



