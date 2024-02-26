import Slider from "react-slick";
import { useState } from "react";
import PropTypes from "prop-types";
import './slider.css'

const Slider1 = ({ data, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  const settings = {
    lazyLoad: "ondemand",
    slidesToShow: 5,
    slidesToScroll: 3,
    dots: false,
    nextArrow: (
        <div>
          <div className="next-slick-arrow">
              <img  stroke="white" height="24"  width="24"/><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/>
          </div>
        </div>
      ),
  
    prevArrow: (
        <div>
          <div className="next-slick-arrow rotate-180">
            <img  stroke="white" height="24"  width="24"/><path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/>
          </div>
        </div>
      ),
    infinite: true,
    speed: 200,
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
            
            {/* <div className="carousel-caption"> */}
              {/* <h3>{slide.title}</h3> */}
              {/* <p>{slide.description}</p> */}
            {/* </div> */}
          </div>
        ))}
      </Slider>
      {/* <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right"></span>
                <span className="sr-only">Next</span>
            </a> */}
      {/* <div className="current-slide">Current Slide: {currentIndex + 1}</div> */}
      
    </div>
  );
};
Slider1.propTypes = { data: PropTypes.array, title: PropTypes.string };
export default Slider1;
