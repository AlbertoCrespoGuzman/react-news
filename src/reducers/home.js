const INITIAL_STATE = {
    data: [],
    noticias: [],
    isFetching: false,
    error:false,
    categoryName: null
}

const home = ( state = INITIAL_STATE, action) => {
    if(action.type === 'LOAD_HOME_REQUEST' ){
        return {
            isFetching: true,
            data: [],
            noticias: action.noticias,
            error: false,
            numPage: action.numPage,
            categoryName: action.categoryName
        }
    }
    if(action.type === 'LOAD_HOME_SUCCESS' ){
        return {
            isFetching: false,
            data: action.data,
            noticias: action.data.docs,
            error: false,
            categoryName: action.categoryName
        }
    }
    if(action.type === 'LOAD_HOME_ERROR' ){
        return {
            isFetching: false,
            data: [],
            noticias: [],
            error: true
        }
    }
    return state
}

export default home