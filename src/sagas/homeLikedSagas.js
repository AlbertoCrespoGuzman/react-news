import { put } from 'redux-saga/effects'
import  { loadHomeLikedSuccess } from './../actions'
require('dotenv').config()

function *getHomeLiked(axios, actions){
    if(!actions.categoryName){
        const dados = yield axios.get('http://' + process.env.DOMAIN  + ':' + process.env.PORT +  '/liked/')
        yield put(loadHomeLikedSuccess(dados.data))
    }else{
        const dados = yield axios.get('http://' + process.env.DOMAIN  + ':' + process.env.PORT +  '/liked/category/' + actions.categoryName)
        yield put(loadHomeLikedSuccess(dados.data))
    }
  
}
export default getHomeLiked