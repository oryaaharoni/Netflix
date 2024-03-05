import './carousel.css'
import { PropTypes } from '../../../imports'
import ReactPlayer from 'react-player'

const Carousel = ({ data }) => {
    
    console.log('data in carousel: ', data)
    if (!data || data.length === 0) {
        return null;
    }

    return (
        
        // maybe remove id and class name
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
        
            {/* <!-- Wrapper for slides --> */}
            <div className="carousel-inner">
                { data.map((item, index) => (
                    <div key={index} className={`item ${index === 0 ? 'active' : ''}`}>
                        <div className="overlay">
                            <h3 className='content-title'>{item.title}</h3>
                            <p>{item.description}</p>
                            <div className='content-btnDiv'>
                                {/* change button to a */}
                                <button className='content-btn'><i className="fa fa-play" aria-hidden="true"></i> Play</button>
                                <a className='content-a' href='/info'><i className="fa fa-exclamation-circle" aria-hidden="true"></i> Info</a>
                            </div>
                        </div>
                        {/* <ReactPlayer url={item.trailer} muted={true} playing={true} loop={true} width="100%" height="100%" /> */}
                        <img src={item.img} alt={`Slide ${index}`} style={{ width: '100%', height: '100%' }} />
                    </div>
                )) }
            </div>

            {/* <!-- Left and right controls --> */}
            {/* <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right"></span>
                <span className="sr-only">Next</span>
            </a> */}
        </div>
        // </div>
    )
}
Carousel.propTypes ={data: PropTypes.array}
export default Carousel