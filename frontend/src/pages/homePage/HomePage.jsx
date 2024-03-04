import { Store } from "../../Store";
import NavBar from "../../components/Shared/NavBar/NavBar";
import "./homePage.css";
import { GET_REQUEST, GET_SUCCESS, MY_LIST } from "../../reducers/actions";
import Carousel from "../../components/Shared/Carousel/Carousel";
import Slider1 from "../../components/Shared/Slider/Slider";
import { useNavigate, useContext, useEffect, axios, useLocation } from '../../imports.js';
import { useState } from "react";

const HomePage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [isScrolled, setIsScrolled] = useState(false);

  // maybe remove loading and data
  const { loading, error, data } = state;

  const [allContent, setAllContent] = useState(null);
  const [movies, setMovies] = useState(null);
  const [series, setSeries] = useState(null);
  const [myList, setMyList] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  
  const getContent = async (url, requiresUserId) => {
    ctxDispatch({ type: GET_REQUEST });
    try {
      const fullUrl = requiresUserId ? `${url}/${userInfo['_id']}` : url;
      const { data } = await axios.get(fullUrl, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      ctxDispatch({ type: GET_SUCCESS, payload: data });
      return data;
    } catch (err) {
      console.error(err);
      navigate("/signIn");
    }
  }


  // let contentEndpoint;
  // if (location.pathname === '/movies') {
  //   contentEndpoint = '/api/v1/content/movies';
  // } else if (location.pathname === '/series') {
  //   contentEndpoint = '/api/v1/content/series';
  // } else {
  //   contentEndpoint = '/api/v1/content'; // Default: All Movies and Series
  // }


  // useEffect(() => {
  //   console.log('contentEndPoint ', contentEndpoint)
  //   if (!userInfo) {
  //     navigate("/signIn");
  //   } else {
  //     console.log('contentEndPoint ', contentEndpoint)
  //     Promise.all([
  //       getContent(contentEndpoint),
  //       getContent("/api/v1/content/myList", true),
  //     ]).then(([contentData, myListData]) => {
  //       setAllContent(contentData);
  //       setMovies(contentData.movies);  // Adjust this based on your API response structure
  //       setSeries(contentData.series);  // Adjust this based on your API response structure
  //       setMyList(myListData);
  //       ctxDispatch({ type: MY_LIST, payload: myListData });
  //     });
  //   }

    
  useEffect(() => {
    if (!userInfo) {
      navigate("/signIn");
    } else {
      Promise.all([
        getContent("/api/v1/content"),
        getContent("/api/v1/content/movies"),
        getContent("/api/v1/content/series"),
        getContent("/api/v1/content/myList", true),

      ]).then(([allContentData, moviesData, seriesData, myListData]) => {
        setAllContent(allContentData);
        setMovies(moviesData);
        setSeries(seriesData);
        setMyList(myListData);
        ctxDispatch({type: MY_LIST, payload: myListData})
      });
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
      <NavBar className={isScrolled ? 'navBarInHomePage scrolled' : 'navBarInHomePage'}/>
      <Carousel data={allContent} />

      {/* change data to privat list user */}
      <Slider1 data={allContent} title={"All Movies And Series"}/>
      <Slider1 data={movies} title={"Movies"}/>
      <Slider1 data={series} title={"Series"}/>
      <Slider1 data={myList} title={"My List"}/>
    </div>
  );
};

export default HomePage;
