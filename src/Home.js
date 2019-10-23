import React, { Component } from 'react'

import { loadHomeRequest, loadHomeVisitedRequest, 
    loadHomeLikedRequest } from './actions'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from "@fortawesome/free-solid-svg-icons"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Container from '@material-ui/core/Container'
import CircularProgress from '@material-ui/core/CircularProgress' 
import Grow from  '@material-ui/core/Grow'
import Box from  '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'

import { Link } from 'react-router-dom'
import {
    BrowserView,
    MobileView
  } from "react-device-detect"
  import AppBar from '@material-ui/core/AppBar';
  import Toolbar from '@material-ui/core/Toolbar'
  import BottomScrollListener from 'react-bottom-scroll-listener'
  import * as colors from '@material-ui/core/colors'
  import AdSense from 'react-adsense'

class Home extends Component {
    constructor(props){
        super(props)
        this.renderVisited = this.renderVisited.bind(this)
        this.LoadMoreNoticias = this.LoadMoreNoticias.bind(this)
        this.buildLayout = this.buildLayout.bind(this)
        this.renderNoticia = this.renderNoticia.bind(this)
        this.state = {
            firstTime : true,
            noticiasAccount: 0,
            visitedAccount: 0,
            likedAccount: 0,
            page: 1
        }
    }
    componentDidMount(){
        this.buildLayout(!this.state.firstTime)
    }
    componentWillReceiveProps(newProps){
        if(this.props.match.params.categoryName !== newProps.match.params.categoryName){
            this.props.match.params.categoryName = newProps.match.params.categoryName
            this.buildLayout(false)
        }
        
    }
    buildLayout(addPrevNoticias){
        this.setState({
            firstTime: false
        }) 
        this.props.onChangeColor(this.getColorByCategory(this.props.match.params.categoryName))
        this.props.onChangeLogo(this.props.match.params.categoryName)
        let noticias = []
        if(this.props.noticias && addPrevNoticias){
            noticias = this.props.noticias
        }   
            if(this.props.match.params.numPage){
                this.props.loadData( this.props.match.params.numPage, noticias, this.props.match.params.categoryName)
            }else{
                this.props.loadData(1, noticias, this.props.match.params.categoryName)
            }
            this.props.loadVisitedData(this.props.match.params.categoryName)
            this.props.loadLikedData(this.props.match.params.categoryName)
        
    }
    getColorByCategory(categoryName){
        let color =  null
        switch(categoryName) {
            case 'general':
                color = colors.lightBlue
            break
            case 'science':
                color = colors.yellow
            break
            case 'technology':
                color = colors.yellow
            break
            case 'health':
                color = colors.pink
            break
            case 'business':
                color = colors.deepPurple
            break
            case 'sports':
                color = colors.green
            break
            case 'entertainment':
                color = colors.orange
            break
            default:
                color = colors.blue
        }
        return color
    }
    renderNoticia(noticia, index){
        return (

          <div key={noticia._id}  >
            <Grow 
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                {...(true ? { timeout: 1000 } : {})}
            >
            <ListItem  >
               <Card className={classes.card}>
               <CardHeader
                        avatar={
                            <IconButton style={{margin: -14}} component={ Link } to={`/category/${noticia.category.name}/page/1`}>
                                <Avatar aria-label="Recipe" style={{ background: this.getColorByCategory(noticia.category.name)['A400'] }}>
                                    <FontAwesomeIcon icon={Icons[noticia.category.icon]} style={{color: '#FFFFFF'}} />
                                </Avatar>
                         </IconButton>
                        }
                        
                        title={noticia.source}
                        subheader = {convertDate(noticia.publishedAt)}
                    />
                    <CardActionArea style={{textDecoration: 'none', color: 'white' }} component={ Link } to={`/noticias/${noticia._id}/category/${noticia.category.name}`}>
                        
                        <CardMedia
                            className={classes.media}
                            src={noticia.urlToImage} component="img"
                            title={noticia.title}
                        />
                        <CardContent>
                            <BrowserView>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {noticia.title}
                                </Typography>
                            </BrowserView>
                            <MobileView>
                                <Typography gutterBottom variant="h6" component="h6">
                                    {noticia.title}
                                </Typography>
                            </MobileView>
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{flex: 1, justifyContent: 'center' }}>
                        
                        <Button size="small" color="primary" variant="contained"  component={ Link } 
                        to={`/noticias/${noticia._id}/category/${noticia.category.name}`}
                        >
                        Ver Notícia
                        </Button>
                    </CardActions>
                    </Card>
            </ListItem>
            
          </Grow> 
              <Card style={{marginLeft: 15, marginRight:15}}>
                {index % 5 === 0 && (
                    <AdSense.Google
                    client='ca-pub-2353493360641578'
                    slot='6970094343'
                    style={{ display: 'block' }}
                    format='fluid'
                    responsive='true'
                    layoutKey='-4u+c4-5o-gx+1oq'
                  />
                )}
            </Card>
         </div>
        )
        
    }
    
    renderVisited(visited, index){
        return (
            <div key={visited._id}>
            <Grow  
                in={true}
                style={{ transformOrigin: '0 0 0' , marginLeft: 13}}
                {...(true ? { timeout: 1000 } : {})}
            >
                <Card >
                <CardActionArea style={{display: 'flex', textDecoration: 'none', color: 'white', margin: -14,  }}  component={ Link } to={`/noticias/${visited._id}/category/${visited.category.name}`}>
                    <Box style={{flex: 0.4}} >
                        <CardMedia
                            
                            className={classes.cover}
                            src={visited.urlToImage} 
                            component="img"
                            width={'100%'}
                            height={'100%'}
                        />
                    </Box>
                   <CardContent style={{flex: 0.6}} className={classes.content}>
                            <Typography style={{fontSize: 12, marginTop:10, marginBottom: 10, fontStyle: 'regular'}}>
                                {this.filterMax(visited.title)}
                            </Typography>
                            
                   </CardContent>
                  </CardActionArea>

                    <Divider />
                </Card>
                
             </Grow> 
             
                {(index % 3 === 0) && (
                    <Card style={{ marginLeft: 13}}>
                    <AdSense.Google
                        client='ca-pub-2353493360641578'
                        slot='9639601663'
                        style={{ display: 'block' }}
                        responsive='true'
                        format= 'fluid'
                        layoutKey= '-hs+e-24-4l+gh'
                    />
                  </Card>
                )}
             
             </div>
        )
    }

    getCategoryTextColor(){
        return (
            this.props.match.params.categoryName === 'science' || 
            this.props.match.params.categoryName ==='technology'
            ) ? '#000000' :  '#FFFFFF'
    }

    filterMax(text){
        const max = 90
        if(text.length > max){
            return text.substring(0,max - 3) + '...'
        }else{
            return text
        }
    }

    LoadMoreNoticias(){
            this.setState({
                page: this.state.page + 1
            })
            this.props.loadData(Number(this.state.page), this.props.noticias, this.props.match.params.categoryName )
    }

    render(){
        return (
            <Container >
                <Grid container spacing={3}>
                
                    <Grid item lg={7} md={7} xs={12}>
                        
                            {this.props.noticias.length > 0  && 
                            (
                                <BottomScrollListener onBottom={this.LoadMoreNoticias}>
                                    <List className={classes.ul} >
                                        {this.props.noticias.map(this.renderNoticia)}
                                    </List>
                                </BottomScrollListener>    
                            )}
                            {this.props.isFetching && (
                                <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justify="center"
                              >
                                    <CircularProgress />
                                </Grid>
                            )}
                        
                                
                    </Grid>
                    <Grid item lg={4} md={4} xs={12}>
                        <AppBar position="static" color="primary" style={{marginTop:15, marginLeft:12}}>
                            <Toolbar>
                            <Typography variant="h6" color="inherit" 
                                style={{color: this.getCategoryTextColor()}}>
                                Populares
                            </Typography>
                            </Toolbar>
                        </AppBar>
                        <List className={classes.ul} >
                            <BrowserView>
                                {!this.props.isFetchingVisited  && this.props.visited.map(this.renderVisited)}
                                {this.props.isFetchingVisited && (
                                                    <Grid
                                                    container
                                                    spacing={0}
                                                    direction="column"
                                                    alignItems="center"
                                                    justify="center"
                                                >
                                                        <CircularProgress />
                                                    </Grid>
                                                )}
                                    
                            </BrowserView>
                            <MobileView>
                            {!this.props.isFetchingVisited  && this.props.visited.map(this.renderNoticia)}
                                {this.props.isFetchingVisited && (
                                                        <Grid
                                                        container
                                                        spacing={0}
                                                        direction="column"
                                                        alignItems="center"
                                                        justify="center"
                                                    >
                                                            <CircularProgress />
                                                        </Grid>
                                                    )}
                            </MobileView>
                        </List>
                        <AdSense.Google
                                        client='ca-pub-2353493360641578'
                                        slot='9148647073'
                                        style={{ display: 'block',width: 380, height: 600 }}
                                        format=''
                                        responsive='true'
                                    />
                        <AppBar position="static" color="primary" style={{marginTop:15, marginLeft:12}}>
                            <Toolbar>
                            <Typography variant="h6" color="inherit"  style={{color: this.getCategoryTextColor()}}>
                                Mais Relevantes
                            </Typography>
                            </Toolbar>
                        </AppBar>
                        <List className={classes.ul} >
                            <BrowserView>
                                {!this.props.isFetchingLiked  && this.props.liked.map(this.renderVisited)}
                                {this.props.isFetchingLiked && (
                                                        <Grid
                                                        container
                                                        spacing={0}
                                                        direction="column"
                                                        alignItems="center"
                                                        justify="center"
                                                    >
                                                            <CircularProgress />
                                                        </Grid>
                                                    )}
                            </BrowserView>
                            <MobileView>
                            {!this.props.isFetchingLiked  && this.props.liked.map(this.renderNoticia)}
                                {this.props.isFetchingLiked && 
                                                    (
                                                        <Grid
                                                        container
                                                        spacing={0}
                                                        direction="column"
                                                        alignItems="center"
                                                        justify="center"
                                                    >
                                                            <CircularProgress />
                                                        </Grid>
                                                    )}
                            </MobileView>
                        </List>
                        
                    </Grid>
                    
                </Grid>
                
            </Container>
        )
    }
}


function convertDate(date){
   return  Moment(date).format('DD/MM/YYYY hh:mm A')
}
const mapStateToProps = (state, ownProps) => {
        return {
            isFetching: state.home.isFetching,
            data: state.home.data,
            noticias: state.home.noticias,
            error: state.home.error,
            visited: state.visited.visited,
            isFetchingVisited: state.visited.isFetching,
            liked: state.liked.liked,
            isFetchingLiked: state.liked.isFetching,
            categoryName: state.home.categoryName
        }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (numPage, noticias, categoryName) => dispatch(loadHomeRequest(numPage, noticias, categoryName)),
        loadVisitedData: (categoryName) => dispatch(loadHomeVisitedRequest(categoryName)),
        loadLikedData: (categoryName) => dispatch(loadHomeLikedRequest(categoryName)),
     
    }
} 
const classes = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    card: {
        maxWidth: 345,
    },
      media: {
        height: 40,
    },
    cardList: {
        marginTop: 50,
    },
    icon: {
        margin: theme.spacing(2),
      },
    ul: {
        listStyle: 'none'
    },
    li: {
        marginBottom: 10
    },
    cardvisited: {
        display: 'flex'
      },
      details: {
        display: 'flex',
        flexDirection: 'column',
      },
      content: {
        flex: '1 0 auto',
      },
      cover: {
        width: 51,
        height: 50

      }
  }));

export default connect(mapStateToProps, mapDispatchToProps)(Home)
