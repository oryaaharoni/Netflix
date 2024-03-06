import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
import NavBar from '../../components/Shared/NavBar/NavBar';
import Carousel from '../../components/Shared/Carousel/Carousel';
import SliderList from '../../components/Shared/SliderList/SliderList';
import { GET_REQUEST, GET_SUCCESS, MY_LIST } from '../../reducers/actions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ContentPage = ({ includeMyList, apiEndpoint }) => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [isScrolled, setIsScrolled] = useState(false);
    const [myList, setMyList] = useState(null);
    const navigate = useNavigate();
    const [content, setContent] = useState(null);

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
                console.log('my list from sb', myListFromDB.data)
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

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <NavBar className={isScrolled ? 'navBarInHomePage scrolled' : 'navBarInHomePage'} />
            <Carousel />
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

