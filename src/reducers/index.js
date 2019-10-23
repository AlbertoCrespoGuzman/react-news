import  { combineReducers } from 'redux'
import home from './home'
import visited from './visited'
import liked from './liked'
import noticia from './noticia'
import bio from './bio'

export default combineReducers({ home, visited, liked, noticia, bio})