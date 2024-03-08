import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
// import Carousel from '../../components/Shared/Carousel/Carousel';
import SliderList from '../../components/Shared/SliderList/SliderList';
import { GET_REQUEST, GET_SUCCESS, MY_LIST } from '../../reducers/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Billboard from '../../components/Shared/Billboard/Billboard';

const ContentPage = () => {
    let includeMyList, apiEndpoint;
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    // const [isScrolled, setIsScrolled] = useState(false);
    const [myList, setMyList] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [content, setContent] = useState(null);
    // let random;
    // try something for billboard
    const w = {
        _id:"123",
        title: 'The Revenant',
        description:
          'The Revenant is a 2015 American semi-biographical epic western film directed by Alejandro G. Iñárritu. The screenplay by Mark L. Smith and Iñárritu is based in part on Michael Punke`s 2002 novel of the same name, describing frontiersman Hugh Glass`s experiences in 1823.',
        img: 'https://www.indiewire.com/wp-content/uploads/2016/06/the-revenant.jpg',
        imgTitle:
          'https://images.squarespace-cdn.com/content/v1/5bfdc74875f9ee194f3e0add/1596652890102-76FXS415ATRW83ANRXXK/the-revenant-563b02dac00e3.png',
        imgThumb:
          'https://variety.com/wp-content/uploads/2013/07/the-revenant-movie-reivew-2.jpg',
        imgVertical: 'https://m.media-amazon.com/images/I/A1BjliXNDPL.jpg',
        trailer: 'https://youtu.be/LoebZZ8K5N0',
        movie: 'https://youtu.be/LoebZZ8K5N0',
        duration: '1 hour 15 min',
        year: '2015',
        limit: '15',
        genre: 'Action',
        isSeries: false,
      }

    const getContent = async () => {
        ctxDispatch({ type: GET_REQUEST });
        try {
            const { data } = await axios.get(apiEndpoint, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
           
            setContent(data);
            ctxDispatch({ type: GET_SUCCESS, payload: data });
            if (includeMyList) {
                const myListFromDB = await axios.get(`/api/v1/content/myList/${userInfo['_id']}`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                setMyList([myListFromDB.data])
                ctxDispatch({ type: MY_LIST, payload: myListFromDB.data.contentList })
            }
            
            

        } catch (err) {
            console.error(err);
              navigate("/signIn");
        }
    };

    useEffect(() => {
        if (!userInfo) {
            navigate("/signIn");
        } else {
            // change content by url
            if(location.pathname === "/"){
                includeMyList = true;
                apiEndpoint = "/api/v1/content"
            }
            else if(location.pathname === '/movies'){
                includeMyList = false;
                apiEndpoint = "/api/v1/content/movies"
            }
            else if(location.pathname === '/series'){
                includeMyList = false;
                apiEndpoint = "/api/v1/content/series"
            }
            getContent();

            
        }
    }, []);


    // const generateRandomNumber = () => {
    //     const min = 1;
    //     const max = 15;
    //     const newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    //     console.log("random: ",newRandomNumber);
    //     random= newRandomNumber;
    //   };

    // generateRandomNumber();
    return (
        <div>
            {/* {content && content.map((number, index) => {
                {number[index] === random &&  <Billboard item={number}/>}
            }
                
            )} */}
            <Billboard item={w}/>
            {/* <Carousel /> */}
            {myList &&
                <SliderList contentList={myList} />
            }
            <SliderList contentList={content} />
        </div>
    );
};

export default ContentPage;



// import React, { useContext, useEffect, useState } from 'react';
// import { Store } from '../../Store';
// import NavBar from '../../components/Shared/NavBar/NavBar';
// import Carousel from '../../components/Shared/Carousel/Carousel';
// import SliderList from '../../components/Shared/SliderList/SliderList';
// import { GET_REQUEST, GET_SUCCESS, MY_LIST } from '../../reducers/actions';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ContentPage = ({ includeMyList, apiEndpoint }) => {
//     const { state, dispatch: ctxDispatch } = useContext(Store);
//     const { userInfo } = state;
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [myList, setMyList] = useState(null);
//     const navigate = useNavigate();
//     const [content, setContent] = useState(null);

//     const getContent = async () => {
//         ctxDispatch({ type: GET_REQUEST });
//         try {
//             const { data } = await axios.get(apiEndpoint, {
//                 headers: { Authorization: `Bearer ${userInfo.token}` },
//             });

//             setContent(data);

//             ctxDispatch({ type: GET_SUCCESS, payload: data });

//             if (includeMyList) {
//                 const myListFromDB = await axios.get(`/api/v1/content/myList/${userInfo['_id']}`, {
//                     headers: { Authorization: `Bearer ${userInfo.token}` },
//                 });

//                 setMyList([myListFromDB.data])
//                 console.log('my list from sb', myListFromDB.data)
//                 ctxDispatch({ type: MY_LIST, payload: myListFromDB.data.contentList })
//             }
//         } catch (err) {
//             console.error(err);
//               navigate("/signIn");
//         }
//     };

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

//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, []);

//     return (
//         <div>
//             <NavBar className={isScrolled ? 'navBarInHomePage scrolled' : 'navBarInHomePage'} />
//             <Carousel />
//             {includeMyList &&
//                 <SliderList contentList={myList} />
//             }
//             <SliderList contentList={content} />
//         </div>
//     );
// };

// export default ContentPage;













// import React, { useContext, useEffect, useState } from 'react';
// import { Store } from '../../Store';
// import NavBar from '../../components/Shared/NavBar/NavBar';
// import Carousel from '../../components/Shared/Carousel/Carousel';
// import SliderList from '../../components/Shared/SliderList/SliderList';
// import { GET_REQUEST, GET_SUCCESS, MY_LIST } from '../../reducers/actions';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ContentPage = ({ name, includeMyList, apiEndpoint }) => {
//     const { state, dispatch: ctxDispatch } = useContext(Store);
//     const { userInfo } = state;
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [myList, setMyList] = useState(null);
//     const navigate = useNavigate();
//     const [content, setContent] = useState({
//         allContent: null,
//         moviesContent: null,
//         seriesContent: null,
//         myListContent: null
//     });

//     const getContent = async () => {
//         ctxDispatch({ type: GET_REQUEST });
//         try {
//             const { data } = await axios.get(apiEndpoint, {
//                 headers: { Authorization: `Bearer ${userInfo.token}` },
//             });

//             console.log(name)
//             console.log('API Response:', data);
//             // setContent({ ...content, [name]: data });
//             setContent(prevContent => ({ ...prevContent, [name]: data })); // Use the updater function
//             console.log(content[name])
//             // setContent(data);

//             ctxDispatch({ type: GET_SUCCESS, payload: data });

//             if (includeMyList) {
//                 const myListFromDB = await axios.get(`/api/v1/content/myList/${userInfo['_id']}`, {
//                     headers: { Authorization: `Bearer ${userInfo.token}` },
//                 });
//                 // setContent({ ...content, ['myListContent']: myListFromDB.data.contentList });
//                 setContent(prevContent => ({ ...prevContent, myListContent: myListFromDB.data.contentList }));
//                 // setMyList([myListFromDB.data])
//                 console.log('consdfjlskdfj ', content)
//                 console.log('my list from sb', myListFromDB.data)
//                 ctxDispatch({ type: MY_LIST, payload: myListFromDB.data.contentList })
//             }
//         } catch (err) {
//             console.error(err);
//             navigate("/signIn");
//         }
//     };

//     useEffect(() => {
//         if (!userInfo) {
//             navigate("/signIn");
//         } else {
//             console.log('dfsdfsdfasdfasdfasdfdsa',content)
//             if(!content[name]){
//                 console.log('dfsdfsdfasdfasdfasdfdsa',content)
//                 getContent();
//             }
//         }

//         const handleScroll = () => {
//             if (window.scrollY > 0) {
//                 setIsScrolled(true);
//             } else {
//                 setIsScrolled(false);
//             }
//         };

//         window.addEventListener("scroll", handleScroll);

//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, [userInfo, content, name, getContent]);

//     useEffect(() => {
//         console.log('asdjklfasdl;kfjalksdjfal;skdfjas;dlkfjasl;dkfjal;sdkfja;lsdkjfa;lskdjfa;lksdjf')
//         console.log(content);
//     }, [content]);

//     return (
//         <div>
//             <NavBar className={isScrolled ? 'navBarInHomePage scrolled' : 'navBarInHomePage'} />
//             <Carousel />
//             {console.log(content['myListContent'])}
//             {includeMyList &&
//                 // <SliderList contentList={myList} />
//                 <>
//                 <SliderList contentList={content.myListContent} />
//                 {console.log(includeMyList)}
//                 </>
//             }
//             {/* <SliderList contentList={content[name]} /> */}
//             {console.log(content)}
//             {/* {content && content[name] && <SliderList contentList={content[name]} />} */}
//         </div>
//     );
// };

// export default ContentPage;

