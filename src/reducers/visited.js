const INITIAL_STATE = {
    visited: [],
    isFetching: false,
    error:false
}

const visited = ( state = INITIAL_STATE, action) => {
    if(action.type === 'LOAD_HOME_VISITED_REQUEST' ){
        return {
            isFetching: true,
            visited: [],
            error: false,
            numPage: action.numPage
        }
    }
    if(action.type === 'LOAD_HOME_VISITED_SUCCESS' ){
        return {
            isFetching: false,
            visited: action.visited,
            error: false
        }
    }
    if(action.type === 'LOAD_HOME_VISITED_ERROR' ){
        return {
            isFetching: false,
            visited: [],
            error: true
        }
    }
    return state
}

export default visited