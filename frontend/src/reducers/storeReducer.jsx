import { GET_FAIL, GET_REQUEST, GET_SUCCESS, USER_SIGNIN, USER_SIGNOUT } from "./actions";

const storeReducer = (state, action) => {
    switch (action.type) {
        case USER_SIGNIN: {
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            return { ...state, userInfo: action.payload };
        }
        case USER_SIGNOUT: {
            localStorage.removeItem('userInfo');
            return { ...state, userInfo: null }
        }
        case GET_REQUEST: {
            return { ...state, loading: true }
        }
        case GET_SUCCESS: {
            return { ...state, loading: false, data: action.payload }
        }
        case GET_FAIL: {
            return { ...state, loading: false, error: action.payload }
        }
        default:
            return { ...state };
    }
}



export default storeReducer;