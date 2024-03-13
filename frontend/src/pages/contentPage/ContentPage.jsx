import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
import SliderList from '../../components/Shared/SliderList/SliderList';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS, MY_LIST } from '../../reducers/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Billboard from '../../components/Shared/Billboard/Billboard';
import Loading from '../../components/Shared/Loading/Loading';

const ContentPage = () => {
    let includeMyList, apiEndpoint;
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo, loading } = state;
    const [myList, setMyList] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [content, setContent] = useState(null);
    const [billboardData, setBillboardData] = useState();


    const getContent = async () => {
        ctxDispatch({ type: GET_REQUEST });
        try {
            const { data } = await axios.get(apiEndpoint, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });

            if (includeMyList) {
                const myListFromDB = await axios.get(`/api/v1/content/myList/${userInfo['_id']}`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                setMyList([myListFromDB.data])
                ctxDispatch({ type: MY_LIST, payload: myListFromDB.data })
            }

            setContent(data)
            ctxDispatch({ type: GET_SUCCESS, payload: data });
        } catch (err) {
            ctxDispatch({ type: GET_FAIL, payload: err });
            console.error(err);
            navigate("/signin");
        }
    };

    useEffect(() => {
        if (!userInfo) {
            navigate("/signin");
        } else {
            if (location.pathname === "/") {
                includeMyList = true;
                apiEndpoint = "/api/v1/content";
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
        if (!billboardData) {
            putRandomContentInBillboard();
        }
    }, [content])

    useEffect(() => {
        if (userInfo && userInfo.myList) {
            setMyList([userInfo.myList])
        }
    }, [userInfo?.myList])


    const putRandomContentInBillboard = () => {
        if (!content || content.length == 0) {
            return;
        }
        const newRandomNumber = Math.floor(Math.random() * (content.length));
        if (content[newRandomNumber].contentList) {
            const randomInList = Math.floor(Math.random() * (content[newRandomNumber].contentList.length));
            setBillboardData(content[newRandomNumber].contentList[randomInList]);
        }
    };

    return (
        loading ? <Loading /> : (
            <div style={{ overflow: "hidden" }}>
                <Billboard item={billboardData} />
                {myList &&
                    <SliderList contentList={myList} />
                }
                <SliderList contentList={content} />
            </div>
        )
    );
};

export default ContentPage;