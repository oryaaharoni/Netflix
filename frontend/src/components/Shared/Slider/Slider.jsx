import Slider from "react-slick";
import { useState , useEffect} from "react";
import PropTypes from "prop-types";
import './slider.css'

const Slider1 = ({ data, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  const settings = {
    lazyLoad: "ondemand",
    slidesToShow: 5,
    slidesToScroll: 3,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    beforeChange: (current, next) => setCurrentIndex(next),
  };

  if (!data || data.length === 0) {
    return null;
  }
  
  

  return (
    <div>
      <h1>{title}</h1>
      <Slider {...settings}>
        {data.map((slide, index) => (
          <div key={index}>
            <img src={slide.img} alt={`Slide ${index}`} />
            
            <div className="carousel-caption">
              {/* <h3>{slide.title}</h3> */}
              {/* <p>{slide.description}</p> */}
            </div>
          </div>
        ))}
      </Slider>
      <div className="current-slide">Current Slide: {currentIndex + 1}</div>
    </div>
  );
};
Slider1.propTypes = { data: PropTypes.array, title: PropTypes.string };
export default Slider1;
