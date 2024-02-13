const storeReducer = (state, action) => {
    switch (action.type) {
        case 'USER_SIGNIN': {
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            return { ...state, userInfo: action.payload };
        }
        case 'USER_SIGNOUT': {
            return { ...state, userInfo: null }
        }
        default:
            return { ...state };
    }
}



export default storeReducer;