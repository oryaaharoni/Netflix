import { useNavigate } from 'react-router-dom';
import { Store } from '../../Store';
import NavBar from '../../components/Shared/NavBar/NavBar'
import './homePage.css'
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { GET_REQUEST, GET_SUCCESS } from '../../reducers/actions';
import Carousel from '../../components/Shared/Carousel/Carousel';
import Slider1 from '../../components/Shared/Slider/Slider';

const HomePage = () => {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const { loading, error, data } = state;
  const navigate = useNavigate();


  useEffect(() => {
    if (!userInfo) {
      navigate('/signIn');
    }
    else {
      const getContent = async () => {
        ctxDispatch({ type: GET_REQUEST });

        try {
          const { data } = await axios.get('/api/v1/content', {
            headers: { authorization: `Bearer ${userInfo.token}` }
          });
          ctxDispatch({ type: GET_SUCCESS, payload: data })
        }
        catch (err) {
          console.log(err);
          navigate('/signIn');
        }
      }
      getContent();
    }
  }, [])


  return (
    <div>
      <NavBar />
      <Carousel data={data} />
      <Slider1 data={data} title={"last seen"}/>
    </div>
  )
}

export default HomePage