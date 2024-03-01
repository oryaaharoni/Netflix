import Slider from "react-slick";
import './slider.css';
import { PropTypes, useState } from '../../../imports';
import React from 'react'
import ReactPlayer from 'react-player'

const Slider1 = ({ data, title }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);


  const settings = {
    lazyLoad: "ondemand",
    slidesToShow: 5,
    slidesToScroll: 1,
    dots: false,
    // nextArrow: (
    //     <div>
    //       <div className="next-slick-arrow">
    //           <img  stroke="white" height="24"  width="24"/><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/>
    //       </div>
    //     </div>
    //   ),

    // prevArrow: (
    //     <div>
    //       <div className="next-slick-arrow rotate-180">
    //         <img  stroke="white" height="24"  width="24"/><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/>
    //       </div>
    //     </div>
    //   ),
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

  if (!data || data.length === 0) {
    return null;
  }



  return (
    <div>
      <p id="titleSlider">{title}</p>
      <Slider className="slider" {...settings}>
        {data.map((item, index) => (
          <div key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
            {hoveredIndex === index ? (
              <ReactPlayer className="sliderImg" url={convertToEmbedLink(item.trailer)} muted={true} playing={true} loop={true} width="90%" height="200px" />

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



