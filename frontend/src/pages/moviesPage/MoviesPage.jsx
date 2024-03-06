// import axios from 'axios'
// import React, { useContext, useEffect, useState } from 'react'
// import { Store } from '../../Store';
// import NavBar from '../../components/Shared/NavBar/NavBar';
// import Carousel from '../../components/Shared/Carousel/Carousel';
// import SliderList from '../../components/Shared/SliderList/SliderList';
// import { GET_REQUEST, GET_SUCCESS } from '../../reducers/actions';
// import { useNavigate } from 'react-router-dom';

// const MoviesPage = () => {

//     const { state, dispatch: ctxDispatch } = useContext(Store);
//     const { userInfo } = state;
//     const [isScrolled, setIsScrolled] = useState(false);
//     const navigate = useNavigate();


//     const [moviesContent, setMoviesContent] = useState(null);

//     const getContent = async () => {
//         ctxDispatch({ type: GET_REQUEST });
//         try {
//             const { data } = await axios.get("/api/v1/content/movies", {
//                 headers: { Authorization: `Bearer ${userInfo.token}` },
//             });

//             setMoviesContent(data);

//             ctxDispatch({ type: GET_SUCCESS, payload: data });

//         } catch (err) {
//             console.error(err);
//             navigate("/signIn");
//         }
//     }


//     useEffect(() => {
//         if (!userInfo) {
//             navigate("/signIn");
//         } else {
//             getContent();
//         }

//         const handleScroll = () => {
//             if (window.scrollY > 0) {
//                 setIsScrolled(true);
//             } else {
//                 setIsScrolled(false);
//             }
//         };

//         window.addEventListener("scroll", handleScroll);

//     }, []);




//     return (
//         <div>
//             <NavBar className={isScrolled ? 'navBarInHomePage scrolled' : 'navBarInHomePage'} />
//             <Carousel />
//             <SliderList contentList={moviesContent} />
//         </div>
//     )
// }

// export default MoviesPage





// import React from 'react';
// import ContentPage from '../contentPage/ContentPage';

// const MoviesPage = () => {
//   return <ContentPage includeMyList={false} apiEndpoint="/api/v1/content/movies" />;
// };

// export default MoviesPage;
