import { put } from 'redux-saga/effects'
import  { loadNoticiaSuccess } from './../actions'
import dotenv from 'dotenv'
dotenv.config()

function *getNoticia(axios, actions){
        const dados = yield axios.get('http://noticieiro.com:3444/api/noticias/' + actions.id)
        
        yield put(loadNoticiaSuccess(dados.data, actions.categoryName, actions.id))
    
}
export default getNoticia