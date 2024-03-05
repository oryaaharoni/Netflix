import { Store } from "../../Store";
import NavBar from "../../components/Shared/NavBar/NavBar";
import "./homePage.css";
import { GET_REQUEST, GET_SUCCESS, MY_LIST } from "../../reducers/actions";
import Carousel from "../../components/Shared/Carousel/Carousel";
import Slider1 from "../../components/Shared/Slider/Slider";
import { useNavigate, useContext, useEffect, axios, useLocation } from '../../imports.js';
import { useState } from "react";
import SliderList from "../../components/Shared/SliderList/SliderList.jsx";

const HomePage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [isScrolled, setIsScrolled] = useState(false);

  // maybe remove loading and data
  const { loading, error, data } = state;

  const [allContent, setAllContent] = useState(null);
  const [myList, setMyList] = useState(null);

  const navigate = useNavigate();

  const getContent = async () => {
    ctxDispatch({ type: GET_REQUEST });
    console.log('userId: ', userInfo['_id'])
    try {
      const { data } = await axios.get("/api/v1/content", {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      const myListFromDB = await axios.get(`/api/v1/content/myList/${userInfo['_id']}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      // const myListData = { name: "My List", contentList: myListFromDB.data }
      // data.push(myListData);
      setMyList([myListFromDB.data])
      console.log('my list from sb', myListFromDB.data)
      setAllContent(data);
      console.log('my list from db: ,', myListFromDB.data)
      ctxDispatch({ type: MY_LIST, payload: myListFromDB.data.contentList })
      ctxDispatch({ type: GET_SUCCESS, payload: data });
    } catch (err) {
      console.error(err);
      navigate("/signIn");
    }
  }


  useEffect(() => {
    if (!userInfo) {
      navigate("/signIn");
    } else {
      getContent();
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

  }, []);

  return (
    <div>
      <NavBar className={isScrolled ? 'navBarInHomePage scrolled' : 'navBarInHomePage'} />
      <Carousel data={allContent} />
      <SliderList contentList={myList}/>
      <SliderList contentList={allContent} />
    </div>
  );
};

export default HomePage;
