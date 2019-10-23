const INITIAL_STATE = {
    data: [],
    isFetching: false,
    error:false,
    categoryName: null,
    id: null,
    comments:[]
}

const noticia = ( state = INITIAL_STATE, action) => {
    if(action.type === 'LOAD_NOTICIA_REQUEST' ){
        return {
            isFetching: true,
            data: [],
            error: false,
            categoryName: action.categoryName,
            id: action.id
        }
    }
    if(action.type === 'LOAD_NOTICIA_SUCCESS' ){
        return {
            isFetching: false,
            data: action.data,
            error: false,
            categoryName: action.categoryName,
            id: action.id,
            comments: action.data.comments
        }
    }
    if(action.type === 'LOAD_NOTICIA_ERROR' ){
        return {
            isFetching: false,
            data: [],
            error: true
        }
    }
    return state
}

export default noticia