import { put } from 'redux-saga/effects'
import  { loadHomeSuccess } from './../actions'

function *getHome(axios, actions){
    if(!actions.categoryName){
        const dados = yield axios.get('http://noticieiro.com/api/noticias/pages/' + actions.numPage)
        let noticiasInfityScroll = actions.noticias.concat(dados.data.docs)
        dados.data.docs = noticiasInfityScroll
    
        yield put(loadHomeSuccess(dados.data, actions.categoryName))
    }else{
        const dados = yield axios.get('http://noticieiro.com/api/noticias/category/' + actions.categoryName 
                        + '/page/' + actions.numPage)
        let noticiasInfityScroll = actions.noticias.concat(dados.data.docs)
        dados.data.docs = noticiasInfityScroll            
        yield put(loadHomeSuccess(dados.data, actions.categoryName))
    }
    
  
}
export default getHome