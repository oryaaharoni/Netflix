import { PropTypes } from '../../imports.js';
import Card from '../../components/Shared/Card/Card.jsx';

const MyListPage = ({data}) => {
  return (
    <div>
        <h3>My List:</h3>
        {data.map((item, index)=>{
            <Card item={item} key={index}></Card>
        })}
       
    </div>
  )
}

MyListPage.propTypes = {data: PropTypes.array}
export default MyListPage