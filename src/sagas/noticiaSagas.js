import { put } from 'redux-saga/effects'
import  { loadNoticiaSuccess } from './../actions'
dotenv.config()

function *getNoticia(axios, actions){
        const dados = yield axios.get('http://' + process.env.DOMAIN + ':' + process.env.PORT + '/api/noticias/' + actions.id)
        
        yield put(loadNoticiaSuccess(dados.data, actions.categoryName, actions.id))
    
}
export default getNoticia