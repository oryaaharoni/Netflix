import './carousel.css'
import { PropTypes, axios, useEffect, useState } from '../../../imports'
import ReactPlayer from 'react-player'
import { useContext } from 'react';
import { Store } from '../../../Store';

// const Carousel = ({ data }) => {
const Carousel = () => {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [allContent, setAllContent] = useState(null);

    useEffect(() => {
        const getContent = async () => {

            try {
                const { data } = await axios.get("/api/v1/content/getContents", {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });

                setAllContent(data);

            } catch (err) {
                console.error(err);
            }
        }
        getContent();
    }, [])


    // console.log('data in carousel: ', data)
    // if (!data || data.length === 0) {
    //     return null;
    // }
    if (!allContent || allContent.length === 0) {
        return null;
    }

    return (

        // maybe remove id and class name
        <div id="myCarousel" className="carousel slide" data-ride="carousel">

            {/* <!-- Wrapper for slides --> */}
            <div className="carousel-inner">
                {allContent.map((item, index) => (
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
                ))}
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
Carousel.propTypes = { data: PropTypes.array }
export default Carousel