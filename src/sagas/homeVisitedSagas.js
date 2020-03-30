import { put } from 'redux-saga/effects'
import  { loadHomeVisitedSuccess } from './../actions'
import dotenv from 'dotenv'
dotenv.config()

function *getHomeVisited(axios, actions){
    if(!actions.categoryName){
        const dados = yield axios.get('http://noticieiro.com:3444/visited/')
        yield put(loadHomeVisitedSuccess(dados.data))
    }else{
        const dados = yield axios.get('http://noticieiro.com:3444/visited/category/' + actions.categoryName)
        yield put(loadHomeVisitedSuccess(dados.data))
    }
    
  
}
export default getHomeVisited