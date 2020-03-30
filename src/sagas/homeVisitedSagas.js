import { put } from 'redux-saga/effects'
import  { loadHomeVisitedSuccess } from './../actions'
require('dotenv').config()

function *getHomeVisited(axios, actions){
    if(!actions.categoryName){
        const dados = yield axios.get('http://' + process.env.domain  + ':' + process.env.port + '/visited/')
        yield put(loadHomeVisitedSuccess(dados.data))
    }else{
        const dados = yield axios.get('http://' + process.env.domain  + ':' + process.env.port +  '/visited/category/' + actions.categoryName)
        yield put(loadHomeVisitedSuccess(dados.data))
    }
    
  
}
export default getHomeVisited