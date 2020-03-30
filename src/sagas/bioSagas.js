import { put } from 'redux-saga/effects'
import  { loadBioSuccess } from './../actions'

function *getBio(axios){
        const dados = yield axios.get('http://noticieiro.com/api/noticias/bio')
        yield put(loadBioSuccess(dados.data))
    
}
export default getBio