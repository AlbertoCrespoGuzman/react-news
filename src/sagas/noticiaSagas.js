import { put } from 'redux-saga/effects'
import  { loadNoticiaSuccess } from './../actions'

function *getNoticia(axios, actions){
        const dados = yield axios.get('http://your domain.com/api/noticias/' + actions.id)
        
        yield put(loadNoticiaSuccess(dados.data, actions.categoryName, actions.id))
    
}
export default getNoticia