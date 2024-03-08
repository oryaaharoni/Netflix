import './billboard.css'
import { PropTypes } from '../../../imports'
import ReactPlayer from 'react-player'

const Billboard = ({item}) => {
  return (
    <div className='billboard'>
        <div className='innerBillboard'>
             <ReactPlayer url={item.trailer} muted={true} playing={true} loop={true} width="100%" height="600px" />
            <div className='info'>
                <img src={item.imgTitle}  style={{width:'500px',height:'120px'}}/>
                <div className='description'>
                    {item.description}
                </div>
                <div className='links'>
                    <a href={`/play/${item._id}`}><i className="fa fa-play" aria-hidden="true"></i><span>Play</span></a>
                    <button><i className="fa fa-exclamation-circle" aria-hidden="true"></i><span>Info</span></button>
                </div>
            </div>
        </div>
    </div>
  )
}
Billboard.propTypes = { item: PropTypes.object }
export default Billboard