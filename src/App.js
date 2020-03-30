import React, { useState }  from 'react'
import logoGeneral from  './images/logo-large-complete-general.png'
import logoSports from  './images/logo-large-complete-sports.png'
import logoEntertainment from  './images/logo-large-complete-entertainment.png'
import logoHealth from  './images/logo-large-complete-health.png'
import logoNerd from  './images/logo-large-complete-science.png'
import logoBusiness from  './images/logo-large-complete-business.png'

import { createStore, applyMiddleware } from  'redux'
import { Provider } from 'react-redux'
import CardMedia from '@material-ui/core/CardMedia'
import reducers from './reducers/index'

import {
  BrowserRouter as Router, 
  Route,
  Link
} from 'react-router-dom'

import Home from './Home'
import Noticia from './Noticia'
import  createSagaMiddleware from 'redux-saga' 
import indexSaga from './sagas/index'

import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles,createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from "@material-ui/core/CssBaseline"
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"
import {
  BrowserView,
  MobileView
} from "react-device-detect"
import AdSense from 'react-adsense'
import Bio from './Bio'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducers,
  applyMiddleware(sagaMiddleware)
  )


sagaMiddleware.run(indexSaga)


function App (){
      const appBarRef= React.createRef() 
      const [theme, setTheme] = useState({
        palette: {
          type: "dark",
          background: {
            default: "#FFFFFF"
          }
        }
      })
      const onChangeColor = (color) => {
        console.log('color', color)
        setTheme({
          palette: {
            primary: color,
            type: "dark",
            background: {
              default: color[50]
            }
          }
        });
      };
      const [logo, setLogo] = useState({
          logo: logoGeneral
      })

      const onChangeLogo = (category) => {
        let logo = null
          switch(category) {
            case 'general':
            logo = logoGeneral
              break
            case 'science':
            logo = logoNerd
            break
            case 'technology':
            logo = logoNerd
            break
            case 'business':
            logo = logoBusiness
            break
            case 'health':
            logo = logoHealth
            break
            case 'sports':
            logo = logoSports
            break
            case 'entertainment':
            logo = logoEntertainment
            break
            default:
            logo = logoGeneral
          }
          console.log('logo -> ',logo)
        setLogo({
          logo : logo
        })

      }
      const muiTheme = createMuiTheme(theme);

      const classes = makeStyles(theme => ({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        },
        logo:{
          height: 10
        },
        sectionDesktop: {
          display: 'none',
          [theme.breakpoints.up('md')]: {
            display: 'flex',
          },
        },
        sectionMobile: {
          display: 'flex',
          [theme.breakpoints.up('md')]: {
            display: 'none',
          },
        },
      }))

      const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState({
        mobileMoreAnchorEl: null
      })
      const [firstTime, setFirstTime] = useState({
        firstTime: false
      })
      const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

      function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
        setMobileMoreAnchorEl(event.currentTarget);
        setFirstTime(true)
      }

      function handleMobileMenuClose() {
        setMobileMoreAnchorEl(null);
      }
      const mobileMenuId = 'primary-search-account-menu-mobile'

      const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen && firstTime === true }
            onClose={handleMobileMenuClose}
            style={{display: isMobileMenuOpen ?  'block' : 'none'}} 
          >
            <MenuItem  component={ Link } to="/category/general/page/1" onClick={handleMobileMenuClose}>
                  <FontAwesomeIcon icon={Icons.faNewspaper} style={{color: "#FFFFFF", marginRight: 10}} />   Geral
            </MenuItem>
            <MenuItem   component={ Link } to="/category/science/page/1" onClick={handleMobileMenuClose}>
                  <FontAwesomeIcon icon={Icons.faHandSpock} style={{color: "#FFFFFF", marginRight: 10}} /> Nerd
            </MenuItem>
            <MenuItem component={ Link } to="/category/business/page/1" onClick={handleMobileMenuClose}>
                  <FontAwesomeIcon icon={Icons.faWallet} style={{color: "#FFFFFF", marginRight: 10}} /> Negócios
            </MenuItem>
            <MenuItem component={ Link } to="/category/health/page/1" onClick={handleMobileMenuClose}>
                  <FontAwesomeIcon icon={Icons.faUserInjured} style={{color: "#FFFFFF", marginRight: 10}} /> Saúde
            </MenuItem>
            <MenuItem  component={ Link } to="/category/sports/page/1" onClick={handleMobileMenuClose}>
                  <FontAwesomeIcon icon={Icons.faFutbol} style={{color: "#FFFFFF", marginRight: 10}} /> Esportes
            </MenuItem>
            <MenuItem  component={ Link } to="/category/entertainment/page/1" onClick={handleMobileMenuClose}>
                  <FontAwesomeIcon icon={Icons.faTv} style={{color: "#FFFFFF", marginRight: 10}} /> Entretenimento
            </MenuItem>
            <Divider />
            <MenuItem  component={ Link } to="https://newsapi.org" onClick={handleMobileMenuClose}>
                  <FontAwesomeIcon icon={Icons.faHandHolding} style={{color: "#FFFFFF", marginRight: 10}} /> Powered by NewsAPI.org
            </MenuItem>
            <MenuItem  component={ Link } to="http://noticieiro.com/privacy" onClick={handleMobileMenuClose}>
                  <FontAwesomeIcon icon={Icons.faBook} style={{color: "#FFFFFF", marginRight: 10}} /> Política privacidade
            </MenuItem>
            <MenuItem  component={ Link } to="http://noticieiro.com/about" onClick={handleMobileMenuClose}>
                  <FontAwesomeIcon icon={Icons.faQuestion} style={{color: "#FFFFFF", marginRight: 10}} /> Sobre
            </MenuItem>
          </Menu>

      )
      
          return (
            <Router>
            <Provider store = { store }> 
              <ThemeProvider theme={muiTheme}>
              <CssBaseline />
                <div className={classes.root} style={{paddingBottom: 250}}>
                <AppBar position="static" ref={appBarRef}>
                <Toolbar style={{display: 'flex', flex: 1, justifyContent: 'space-between'}}>
                  <a href="/">
                      <Box height = {60} weight = {50} >
                        <CardMedia
                          height={'80'}
                          component="Link" to="http://noticieiro.com"
                          src={logo.logo} component="img"
                        />
                      </Box>
                  </a>
                  <Box>
                    <BrowserView>
                  <Button variant="inherit" component={ Link } to="/category/general/page/1" >
                        Geral 
                  </Button>
                  <Button variant="inherit"   component={ Link } to="/category/science/page/1" >Nerd
                  </Button>
                  <Button variant="inherit"  component={ Link } to="/category/business/page/1" >Negócios
                  </Button>
                  <Button variant="inherit"  component={ Link } to="/category/health/page/1" >Saúde
                  </Button>
                  <Button variant="inherit"  component={ Link } to="/category/sports/page/1" >Esportes
                  </Button>
                  <Button variant="inherit"  component={ Link } to="/category/entertainment/page/1" >Entretenimento
                  </Button>
                  </BrowserView>
                  </Box>
                  <Box>
                    <BrowserView>
                  <Typography  gutterBottom variant="subtitle1" component="span" style={{fontSize: 13, color: '#FFFFFF'}}>
                      Seguir:
                  </Typography>
                  <IconButton component="a"  href="https://www.instagram.com/noticieiro_noticias/" target="_blank">
                      <Avatar style = {{ fontSize: 30, background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%'}}>
                          <strong style={{marginTop: 2}}><i className="fa fa-instagram" aria-hidden="true" style={{color: '#FFFFFF' }}></i></strong>
                      </Avatar>
                  </IconButton>
                  <IconButton component="a" href="https://www.facebook.com/noticieiro-do-Brasil-2016043141979251" target="_blank">
                          
                      <Avatar style = {{background: '#365899'}}>
                              <i className="fa fa-facebook" aria-hidden="true" style={{color: '#FFFFFF', }}></i>
                      </Avatar>
                  </IconButton>
                  </BrowserView>
                  </Box>
                  <MobileView>
                  <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="Show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                    style={{color: '#FFFFFF'}}
                  >
                    <FontAwesomeIcon icon={Icons.faBars}  />
                  </IconButton>
                </div>
                </MobileView>
                </Toolbar>
              </AppBar>
              <MobileView>
              {renderMobileMenu}
              </MobileView>
              <div style={{marginLeft: 35, marginTop: 15}}>
                  <AdSense.Google
                    client='ca-pub-2353493360641578'
                    slot='8169116635'
                    style={{ display: 'block' }}
                    format='auto'
                    responsive='true'
                  />
              </div>
                  <div className='container'>
                    <Route exact path='/' 
                          render={(props) => {
                                return (<Home {...props} 
                                  onChangeColor = {onChangeColor}
                                  onChangeLogo = {onChangeLogo}
                                  onAppBarRef = {appBarRef}
                                    />)  
                                  } 
                            }
                          />
                    <Route exact path='/category/:categoryName/page/:numPage' 
                        render={(props) => {
                          return (<Home {...props} 
                            onChangeColor = {onChangeColor}
                            onChangeLogo = {onChangeLogo}
                            onAppBarRef = {appBarRef}
                              />)  
                            } 
                      }
                    />
                    <Route exact path='/noticias/:noticiaId/category/:categoryName' 
                        render={(props) => {
                          return (<Noticia {...props} 
                            onChangeColor = {onChangeColor}
                            onChangeLogo = {onChangeLogo}
                            onAppBarRef = {appBarRef}
                              />)  
                            } 
                      }
                    />
                    <Route exact path='/lnoticias/:noticiaId/category/:categoryName' 
                        render={(props) => {
                          return (<Noticia {...props} 
                            onChangeColor = {onChangeColor}
                            onChangeLogo = {onChangeLogo}
                            onAppBarRef = {appBarRef}
                              />)  
                            } 
                      }
                    />
                    <Route exact path='/bio' 
                          render={(props) => {
                                return (<Bio {...props} 
                                  onChangeColor = {onChangeColor}
                                  onChangeLogo = {onChangeLogo}
                                  onAppBarRef = {appBarRef}
                                    />)  
                                  } 
                            }
                          />
                  </div>
                  <div style={{marginTop: 200, position: 'fixed'}}>
                  <BrowserView>
                      <AppBar position="fixed"  style={{ top: 'auto', bottom: 0, backgroundColor: '#212121', maxHeight: 30}}>
                        <Toolbar style={{flex: 1, justifyContent: 'center', maxHeight: 10}}>
                        <div style={{marginTop:-30}}>
                        <a href="https://newsapi.org" target="_blank" style={{marginRight:10, color: '#8f8f8f'}}>powered by NewsAPI.org</a> 
                        
                        | <a  style={{marginRight:10, color: '#8f8f8f'}} href='http://noticieiro.com/privacy'  title='Política de Privacidade' target="_blank">Política de Privacidade</a>
                        | <a  style={{marginRight:10, color: '#8f8f8f'}} href='http://noticieiro.com/about' title='Sobre' target="_blank">Sobre  </a>
                        </div>
                          </Toolbar>
                      </AppBar>    
                  </BrowserView>
                  <MobileView>
                  <AppBar position="fixed"  style={{ top: 'auto', bottom: 0, backgroundColor: '#212121', maxHeight: 50}}>
                        <Toolbar style={{flex: 1, justifyContent: 'center', maxHeight: 10}}>
                        <div style={{marginTop: -7}}>
                            <Typography  gutterBottom variant="subtitle1" component="span" style={{fontSize: 13, color: '#FFFFFF'}}>
                                Seguir:
                            </Typography>
                            <IconButton component="a"  href="https://www.instagram.com/noticieiro_noticias/" target="_blank">
                                <Avatar style = {{ fontSize: 30, background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%'}}>
                                    <strong style={{marginTop: 2}}><i className="fa fa-instagram" aria-hidden="true" style={{color: '#FFFFFF' }}></i></strong>
                                </Avatar>
                            </IconButton>
                            <IconButton component="a" href="https://www.facebook.com/noticieiro-do-Brasil-2016043141979251" target="_blank">
                                    
                                <Avatar style = {{background: '#365899'}}>
                                        <i className="fa fa-facebook" aria-hidden="true" style={{color: '#FFFFFF', }}></i>
                                </Avatar>
                            </IconButton>
                            </div>
                        </Toolbar>
                  </AppBar>
                  </MobileView>
                  </div>
                </div>
                </ThemeProvider>
            </Provider>

            </Router>
          );

  }



export default App
