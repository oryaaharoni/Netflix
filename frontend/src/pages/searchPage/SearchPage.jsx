import axios from 'axios';
import Title from '../../components/Shared/Title'
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
import Card from '../../components/Shared/Card/Card';
import './search.css'
import Loading from '../../components/Shared/Loading/Loading';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../../reducers/actions';

const SearchPage = () => {
  const { search } = useLocation();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, loading } = state;
  const navigate = useNavigate();
  const [currentData, setCurrentData] = useState();
  const [inputData, setInputData] = useState();

  useEffect(() => {
    const getContent = async () => {
      if (!userInfo) {
        navigate('/signin')
      }

      ctxDispatch({ type: GET_REQUEST });

      try {
        const { data } = await axios.get(`api/v1/content/search${search}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setCurrentData(data);
        setInputData(search.split('=')[1]);
        ctxDispatch({ type: GET_SUCCESS, payload: data });

      }
      catch (err) {
        ctxDispatch({ type: GET_FAIL, payload: err });
        console.log(err)
        navigate('/signin')
      }
    }
    getContent();
  }, [search])


  if (currentData == null) {
    return null;
  }

  return (
    <div id='searchPageDivFirst'>
      <div>
        <h1 id='titleSearch'>Showing results found for "{inputData}"</h1>
        {loading ? <Loading /> :
          (
            <div className='containerInSearch'>
              {currentData && currentData.length > 1 && currentData.map((item, index) => (
                <Card item={item} key={index}></Card>
              ))
              }
              {currentData && currentData.length === 1 &&
                <Card item={currentData[0]}></Card>
              }
            </div>
          )}
      </div>
    </div>
  )
}

export default SearchPage