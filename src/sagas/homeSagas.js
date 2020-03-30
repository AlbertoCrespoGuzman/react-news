import { put } from 'redux-saga/effects'
import  { loadHomeSuccess } from './../actions'
import dotenv from 'dotenv'
dotenv.config()

function *getHome(axios, actions){
    if(!actions.categoryName){
        console.log('http://noticieiro.com:3444/api/noticias/pages/' + actions.numPage)
        const dados = yield axios.get('http://noticieiro.com:3444/api/noticias/pages/' + actions.numPage)
        let noticiasInfityScroll = actions.noticias.concat(dados.data.docs)
        dados.data.docs = noticiasInfityScroll
    
        yield put(loadHomeSuccess(dados.data, actions.categoryName))
    }else{
        const dados = yield axios.get('http://noticieiro.com:3444/api/noticias/category/' + actions.categoryName 
                        + '/page/' + actions.numPage)
        let noticiasInfityScroll = actions.noticias.concat(dados.data.docs)
        dados.data.docs = noticiasInfityScroll            
        yield put(loadHomeSuccess(dados.data, actions.categoryName))
    }
    
  
}
export default getHome