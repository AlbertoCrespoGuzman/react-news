import { put } from 'redux-saga/effects'
import  { loadBioSuccess } from './../actions'

import dotenv from 'dotenv'
dotenv.config()

function *getBio(axios){
        const dados = yield axios.get('http://noticieiro.com/api/noticias/bio')
        yield put(loadBioSuccess(dados.data))
    
}
export default getBio