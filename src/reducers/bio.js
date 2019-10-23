const INITIAL_STATE = {
    bio: [],
    isFetching: false,
    error:false
}

const bio = ( state = INITIAL_STATE, action) => {
    if(action.type === 'LOAD_BIO_REQUEST' ){
        return {
            isFetching: true,
            bio: [],
            error: false
        }
    }
    if(action.type === 'LOAD_BIO_SUCCESS' ){
        return {
            isFetching: false,
            bio: action.bio,
            error: false
        }
    }
    if(action.type === 'LOAD_BIO_ERROR' ){
        return {
            isFetching: false,
            bio: [],
            error: true
        }
    }
    return state
}

export default bio