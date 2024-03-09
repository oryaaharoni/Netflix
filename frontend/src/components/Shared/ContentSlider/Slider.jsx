import Slider from "react-slick";
import './slider.css';
import { PropTypes, useEffect, useState } from '../../../imports';
import Card from "../Card/Card";

const ContentSlider = ({ data, title }) => {

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  function getSlidesToShow () {
    const windowWidth = window.innerWidth;
    
    if (windowWidth >= 1650) {
      return 5;
    }else if (windowWidth >= 1350) {
      return 4;
    } else if (windowWidth >= 1000) {
      return 3;
    } else if (windowWidth >= 768) {
      return 2;
    } else {
      return 1;
    }
  };

  const handleResize = () => {
    // window.location.reload();
    setSlidesToShow(getSlidesToShow());
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [])


  const settings = {
    lazyLoad: "ondemand",
    // slidesToShow: data && data.length >= 5 ? 5 : 2,
    slidesToShow: slidesToShow,
    slidesToScroll: 2,
    dots: false,
    infinite: false,
    speed: 200,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
  };

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <>
      <p id="titleSlider"><strong>{title}</strong></p>
      <Slider className="slider" {...settings}>
        {data.map((item, index) => (
          <Card item={item} key={index}></Card>
        ))}
      </Slider>
    </>
  );
};

ContentSlider.propTypes = { data: PropTypes.array, title: PropTypes.string };
export default ContentSlider;



