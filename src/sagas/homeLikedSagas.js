import { put } from 'redux-saga/effects'
import  { loadHomeLikedSuccess } from './../actions'

function *getHomeLiked(axios, actions){
    if(!actions.categoryName){
        const dados = yield axios.get('http://your domain.com/liked/')
        yield put(loadHomeLikedSuccess(dados.data))
    }else{
        const dados = yield axios.get('http://your domain.com/liked/category/' + actions.categoryName)
        yield put(loadHomeLikedSuccess(dados.data))
    }
  
}
export default getHomeLiked