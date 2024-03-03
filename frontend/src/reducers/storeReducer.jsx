import { ADD_ITEM, GET_FAIL, GET_REQUEST, GET_SUCCESS, MY_LIST, REMOVE_ITEM, USER_SIGNIN, USER_SIGNOUT } from "./actions";

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
        case MY_LIST: {
            const updatedUserInfo = {
                ...state.userInfo,
                myList: action.payload
            }
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            return { ...state, loading: false, userInfo: updatedUserInfo };
        }
        case ADD_ITEM: {
            const updatedUserInfo = {
                ...state.userInfo,
                myList: [...state.userInfo.myList, action.payload]
            }
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            return { ...state, loading: false, userInfo: updatedUserInfo };
        }
        case REMOVE_ITEM: {
            const updatedUserInfo = {
                ...state.userInfo,
                myList: [...state.userInfo.myList.filter(item => item._id !== action.payload._id), action.payload]
            }
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            return { ...state, loading: false, userInfo: updatedUserInfo };
        }
        default:
            return { ...state };
    }
}



export default storeReducer;