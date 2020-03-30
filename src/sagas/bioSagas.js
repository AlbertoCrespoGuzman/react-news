import { put } from 'redux-saga/effects'
import  { loadBioSuccess } from './../actions'

require('dotenv').config()

function *getBio(axios){
        const dados = yield axios.get('http://' + process.env.DOMAIN + '/api/noticias/bio')
        yield put(loadBioSuccess(dados.data))
    
}
export default getBio