import { Store } from '../../Store.jsx';
import Card from '../../components/Shared/Card/Card.jsx';
import { useContext, useEffect, useNavigate, useState } from '../../imports.js';
import './myList.css'

const MyListPage = () => {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if(userInfo){
      setData(userInfo.myList.contentList)
    } else{
      navigate('/signin')
    }
  }, [userInfo])

  if (data == null) {
    return null
  }

  return (
    <div id='mylistDivFirst'>
      <div>
        <h1 id='titleMyList'>My List:</h1>
        <div className='divRootMyList'>
          {data.map((item, index) => (
            <Card item={item} key={index}></Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyListPage