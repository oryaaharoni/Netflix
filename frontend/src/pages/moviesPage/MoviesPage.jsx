import axios from 'axios'
import React, { useContext } from 'react'
import { Store } from '../../Store';

const MoviesPage = () => {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        try {
            const { data } = axios.get("/api/v1/content/movies", {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
        }
        catch (err) {
            console.log(err);
        }
    }, [])



    return (
        <div>


        </div>
    )
}

export default MoviesPage