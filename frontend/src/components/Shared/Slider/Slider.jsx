import Slider from "react-slick";
import './slider.css';
import { PropTypes } from '../../../imports';
import Card from "../Card/Card";

const Slider1 = ({ data, title }) => {

  const settings = {
    lazyLoad: "ondemand",
    slidesToShow: data && data.length >= 5 ? 5 : 2,
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

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="asdf">
      <p id="titleSlider"><strong>{title}</strong></p>
      <Slider className="slider" {...settings}>
        {data.map((item, index) => (
          // enter should navigate us to description page
          <div className="divBehindCard" key={index} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
            <Card item={item}></Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

Slider1.propTypes = { data: PropTypes.array, title: PropTypes.string };
export default Slider1;



