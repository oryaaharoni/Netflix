import React from 'react'
import './carousel.css'

const Carousel = ({ data }) => {

    if (!data || data.length === 0) {
        return null;
    }

    return (
        // <div className="container">
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
            {/* <!-- Indicators --> */}
            {/* <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol> */}

            {/* <!-- Wrapper for slides --> */}
            <div className="carousel-inner">
                {data.map((item, index) => (
                    <div key={index} className={`item ${index === 0 ? 'active' : ''}`}>
                        <div className="overlay">
                            <h1 className='content-title'>{item.title}</h1>
                            <p>{item.description}</p>
                            <button className='content-btn'>laskdjflkdsjf</button>
                            <button className='content-btn'>laskdjflkdsjf</button>
                        </div>

                        <img src={item.img} alt={`Slide ${index}`} style={{ width: '100%', height: '100%' }} />
                    </div>
                ))}
            </div>

            {/* <!-- Left and right controls --> */}
            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
        // </div>
    )
}

export default Carousel