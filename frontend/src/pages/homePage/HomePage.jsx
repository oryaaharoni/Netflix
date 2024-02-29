import { Store } from "../../Store";
import NavBar from "../../components/Shared/NavBar/NavBar";
import "./homePage.css";
import { GET_REQUEST, GET_SUCCESS } from "../../reducers/actions";
import Carousel from "../../components/Shared/Carousel/Carousel";
import Slider1 from "../../components/Shared/Slider/Slider";
import { useNavigate, useContext, useEffect,axios } from '../../imports.js';

const HomePage = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  // maybe remove loading and data
  const { loading, error, data } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/signIn");
    } else {
      const getContent = async () => {
        ctxDispatch({ type: GET_REQUEST });

        try {
          const { data } = await axios.get("/api/v1/content", {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          ctxDispatch({ type: GET_SUCCESS, payload: data });
        } catch (err) {
          console.log(err);
          navigate("/signIn");
        }
      };
      getContent();
    }
  }, []);

  return (
    <div>
      <NavBar />
      <Carousel data={data} />

      {/* change data to privat list user */}
      <Slider1 data={data} title={"Last Seen"} />
      <Slider1 data={data} title={"Top Series"} />
      <Slider1 data={data} title={"Top picks for Movie"} />
      <Slider1 data={data} title={"Comedy Movies"} />
      <Slider1 data={data} title={"Crime Series"} />
    </div>
  );
};

export default HomePage;
