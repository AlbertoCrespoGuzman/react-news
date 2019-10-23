import { takeLatest } from 'redux-saga/effects'
import getHome  from './homeSagas'
import getHomeVisited  from './homeVisitedSagas'
import getHomeLiked  from './homeLikedSagas'
import getNoticia from './noticiaSagas'
import getBio from  './bioSagas'

import axios from  'axios'

function *index(){
    yield takeLatest('LOAD_HOME_REQUEST', getHome, axios)
    yield takeLatest('LOAD_HOME_VISITED_REQUEST', getHomeVisited, axios)
    yield takeLatest('LOAD_HOME_LIKED_REQUEST', getHomeLiked, axios)
    yield takeLatest('LOAD_NOTICIA_REQUEST', getNoticia, axios )
    yield takeLatest('LOAD_BIO_REQUEST', getBio, axios )
    
} 

export default index