import { put } from 'redux-saga/effects'
import  { loadHomeLikedSuccess } from './../actions'
import dotenv from 'dotenv'
dotenv.config()

function *getHomeLiked(axios, actions){
    if(!actions.categoryName){
        const dados = yield axios.get('http://noticieiro.com:3444/liked/')
        yield put(loadHomeLikedSuccess(dados.data))
    }else{
        const dados = yield axios.get('http://noticieiro.com:3444/liked/category/' + actions.categoryName)
        yield put(loadHomeLikedSuccess(dados.data))
    }
  
}
export default getHomeLiked