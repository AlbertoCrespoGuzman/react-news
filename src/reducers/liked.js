const INITIAL_STATE = {
    liked: [],
    isFetching: false,
    error:false
}

const liked = ( state = INITIAL_STATE, action) => {
    if(action.type === 'LOAD_HOME_LIKED_REQUEST' ){
        return {
            isFetching: true,
            liked: [],
            error: false,
            numPage: action.numPage
        }
    }
    if(action.type === 'LOAD_HOME_LIKED_SUCCESS' ){
        return {
            isFetching: false,
            liked: action.liked,
            error: false
        }
    }
    if(action.type === 'LOAD_HOME_LIKED_ERROR' ){
        return {
            isFetching: false,
            liked: [],
            error: true
        }
    }
    return state
}

export default liked