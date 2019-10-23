
export const loadHomeRequest = (numPage, noticias, categoryName) => {
    return {
        type : 'LOAD_HOME_REQUEST',
        numPage,
        noticias,
        categoryName
    }
}
export const loadHomeSuccess = (data, categoryName) => {
    return {
        type : 'LOAD_HOME_SUCCESS',
        data,
        noticias: data.docs,
        categoryName
    }   
}
export const loadHomeVisitedRequest = (categoryName) => {
    return {
        type : 'LOAD_HOME_VISITED_REQUEST',
        categoryName
    }
}
export const loadHomeVisitedSuccess = (data) => {
    return {
        type : 'LOAD_HOME_VISITED_SUCCESS',
        visited: data
    }
}    
export const loadHomeLikedRequest = (categoryName) => {
    return {
        type : 'LOAD_HOME_LIKED_REQUEST',
        categoryName
    }
}
export const loadHomeLikedSuccess = (data) => {
    return {
        type : 'LOAD_HOME_LIKED_SUCCESS',
        liked: data
    }
}    
export const loadNoticiaRequest = (categoryName, id) => {
    return {
        type : 'LOAD_NOTICIA_REQUEST',
        categoryName,
        id
    }
}
export const loadNoticiaSuccess = (data, categoryName, id) => {
    return {
        type : 'LOAD_NOTICIA_SUCCESS',
        data,
        categoryName,
        id,
        comments: data.comments
    }   
}
export const loadBioRequest = () => {
    return {
        type : 'LOAD_BIO_REQUEST',
    }
}
export const loadBioSuccess = (bio) => {
    return {
        type : 'LOAD_BIO_SUCCESS',
        bio
    }   
}