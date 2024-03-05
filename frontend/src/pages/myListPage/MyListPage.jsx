// import { PropTypes } from '../../imports.js';
import { Store } from '../../Store.jsx';
import Card from '../../components/Shared/Card/Card.jsx';
import { useContext, useEffect, useState } from '../../imports.js';
import NavBar from '../../components/Shared/NavBar/NavBar.jsx';
import './myList.css'

const MyListPage = () => {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [data, setData] = useState();

  useEffect(() => {
    setData(userInfo.myList)
    console.log('list::   ', userInfo.myList);
  }, [])

  if (data == null) {
    return null
  }

  return (
    <div id='mylistDivFirst'>
      <NavBar />
      <div>
        <div className='divRootMyList'>
        <h3>My List:</h3>
          {data.map((item, index) => (
            <Card item={item} key={index}></Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// MyListPage.propTypes = {data: PropTypes.array}
export default MyListPage