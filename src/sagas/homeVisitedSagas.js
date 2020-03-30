import { put } from 'redux-saga/effects'
import  { loadHomeVisitedSuccess } from './../actions'
import dotenv from 'dotenv'
dotenv.config()

function *getHomeVisited(axios, actions){
    if(!actions.categoryName){
        const dados = yield axios.get('http://' + process.env.DOMAIN  + ':' + process.env.PORT + '/visited/')
        yield put(loadHomeVisitedSuccess(dados.data))
    }else{
        const dados = yield axios.get('http://' + process.env.DOMAIN  + ':' + process.env.PORT +  '/visited/category/' + actions.categoryName)
        yield put(loadHomeVisitedSuccess(dados.data))
    }
    
  
}
export default getHomeVisited