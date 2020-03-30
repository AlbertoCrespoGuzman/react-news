import { put } from 'redux-saga/effects'
import  { loadHomeVisitedSuccess } from './../actions'

function *getHomeVisited(axios, actions){
    if(!actions.categoryName){
        const dados = yield axios.get('http://noticieiro.com/visited/')
        yield put(loadHomeVisitedSuccess(dados.data))
    }else{
        const dados = yield axios.get('http://noticieiro.com/visited/category/' + actions.categoryName)
        yield put(loadHomeVisitedSuccess(dados.data))
    }
    
  
}
export default getHomeVisited