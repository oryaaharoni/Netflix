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
    const [myList, setMyList] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [content, setContent] = useState(null);
    const [billboardData, setBillboardData] = useState();

    const defaultMovie = {
        title: 'Spider-Man: Into the Spider-Verse',
        description:
            'Spider-Man: Into the Spider-Verse is a 2018 American computer-animated superhero film based on the Marvel Comics character Miles Morales / Spider-Man, produced by Columbia Picturess and Sony Picturesp Animation in associationi with Marvel,d and distributed bye Sonyr Pictures Releasing.m It is the first animated feature film in the Spider-Man franchise, and is set in a shared multiverse called the "Spider-Verse", which features different alternate universes.',
        img: 'https://images8.alphacoders.com/929/thumb-1920-929202.jpg',
        imgTitle:
            'https://www.pngmart.com/files/12/Spider-Man-Into-The-Spider-Verse-Logo-PNG-Clipart.png',
        imgThumb:
            'https://m.media-amazon.com/images/M/MV5BOTFlZTA4YjUtYzY3Zi00Mzc2LTllNzAtYjI2ZWNiMGZkZjE2XkEyXkFqcGdeQW1yb3NzZXI@._V1_QL75_UY281_CR86,0,500,281_.jpg',
        imgVertical: 'https://cdn.marvel.com/content/2x/MilesPoster.jpg',
        trailer: 'https://youtu.be/g4Hbz2jLxvQ',
        movie: 'https://youtu.be/g4Hbz2jLxvQ',
        duration: '1 hour 57 min',
        year: '2018',
        limit: '13',
        genre: 'Animation',
        isSeries: false
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
            navigate("/signin");
        }
    };

    useEffect(() => {
        if (!userInfo) {
            navigate("/signin");
        } else {
            // change content by url
            if (location.pathname === "/") {
                includeMyList = true;
                apiEndpoint = "/api/v1/content"
            }
            else if (location.pathname === '/movies') {
                includeMyList = false;
                apiEndpoint = "/api/v1/content/movies"
            }
            else if (location.pathname === '/series') {
                includeMyList = false;
                apiEndpoint = "/api/v1/content/series"
            }

            getContent();
        }
    }, []);

    useEffect(() => {
        if(!billboardData){
            generateRandomNumber();
        }
    }, [content])


    const generateRandomNumber = () => {
        if (!content || content.length == 0) {
            return;
        }
        console.log('content: ', content)
        const newRandomNumber = Math.floor(Math.random() * (content.length));
        console.log('random number: ', newRandomNumber)
        if(content[newRandomNumber].contentList){
            const randomInList = Math.floor(Math.random() * (content[newRandomNumber].contentList.length));
            console.log('random in list: ', randomInList)
            setBillboardData(content[newRandomNumber].contentList[randomInList]);
            console.log('chosen content: ', content[newRandomNumber].contentList[randomInList])
        }
        else{
            console.log('using default spiderman movie')
            setBillboardData(defaultMovie())
        }
    };

    return (
        <div style={{overflow: "hidden"}}>
            <Billboard item={billboardData} />
            {/* <Carousel /> */}
            {myList &&
                <SliderList contentList={myList} />
            }
            <SliderList contentList={content} />
        </div>
    );
};

export default ContentPage;