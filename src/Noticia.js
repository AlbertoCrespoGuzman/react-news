
import React, { Component } from 'react'
import { loadNoticiaRequest, loadHomeLikedRequest, 
            loadHomeVisitedRequest } from './actions'
import { connect } from 'react-redux'
import axios from 'axios'

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
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
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom'
import {
    BrowserView,
    MobileView,
    isMobile
  } from "react-device-detect"
  import AppBar from '@material-ui/core/AppBar';
  import Toolbar from '@material-ui/core/Toolbar'
  import * as colors from '@material-ui/core/colors'
  import {
    FacebookShareButton, TwitterShareButton, TelegramShareButton, 
    WhatsappShareButton } from 'react-share'
    
  import AdSense from 'react-adsense' 
  import dotenv from 'dotenv'
dotenv.config()

class Noticia extends Component{

    constructor(props){
        super(props)
        this.myRef = React.createRef() 
        this.commentsRef = React.createRef()
        this.renderVisited = this.renderVisited.bind(this)
        this.renderNoticia = this.renderNoticia.bind(this)
        this.renderComment = this.renderComment.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
        this.state = {
            firstTime : 0,
            secondTime: false,
            upped: false,
            upping: false,
            uppedComment: {},
            commentNameError: false,
            commentDescriptionError: false,
            commentName: '',
            commentDescription: '',
            commented: false
        }
    }
    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
          setTimeout(() => {
              if(this.props.onAppBarRef.current){
                this.props.onAppBarRef.current.scrollIntoView({ behavior: 'smooth' })
                
              }
          }, 500)
        }
      }
    componentDidMount(){
            this.props.onChangeColor(this.getColorByCategory(this.props.match.params.categoryName))
            this.props.onChangeLogo(this.props.match.params.categoryName)
    
            this.props.loadData(this.props.match.params.categoryName, this.props.match.params.noticiaId)
            this.props.loadVisitedData(this.props.match.params.categoryName)
            this.props.loadLikedData(this.props.match.params.categoryName)
            this.handleScroll()

    }
    componentWillReceiveProps(newProps){
        this.handleScroll()

            if(this.state.firstTime === 4 || this.state.secondTime){
                this.props.onChangeColor(this.getColorByCategory(this.props.match.params.categoryName))
                this.props.onChangeLogo(this.props.match.params.categoryName)
                this.props.loadData(this.props.match.params.categoryName, this.props.match.params.noticiaId)
                if(this.state.secondTime){
                    this.setState({
                        firstTime : 2,
                        secondTime: false,
                        upped: false
                    })
                }
                if(this.state.firstTime === 4){
                    this.setState({
                        firstTime : 2,
                        secondTime: true
                    })
                }
            }else{

                this.setState({
                    firstTime : this.state.firstTime + 1
                })
            }
        
      
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
    renderComment(comment){
        return (
        <Card style={{marginTop:15}} key={comment._id}>
            <CardHeader
                avatar={
                    <IconButton style={{margin: -14}} >
                        <Avatar aria-label="Recipe" style={{ background: this.getColorByCategory(this.props.match.params.categoryName)['A400'] }}>
                            {comment.author.substring(0,1).toUpperCase()}
                        </Avatar>
                </IconButton>
                }
                
                title={comment.author}
                subheader = {convertDate(comment.publishedAt)}
            />
            <CardContent>
                <Typography component = "p" variant="subtitle1">
                    {comment.description}
                </Typography>
            </CardContent>
            <CardActions>
            <Typography variant="body2" color="textSecondary" component="span" style={{marginLeft: 10}}>
                {comment.up}
            </Typography >
            <IconButton style={{color: this.state.uppedComment[comment._id] ?'#ed4956' : '#c6c6c6', marginLeft: -10}}
                
                onClick={() => {
                    if(!this.state.uppedComment[comment._id]){
                        axios.get('http://noticieiro.com:3444/comments/up/' + comment._id)
                        .then(() => {
                            comment.up = Number(comment.up) + 1
                           
                            this.state.uppedComment[comment._id] = true
                            this.setState({})
                        })
                        
                    }
                    
                }}
            >
                <FontAwesomeIcon icon={Icons.faHeart}  />
            </IconButton>
            </CardActions>

        </Card>)
    }
    render(){
        console.log(this.props.noticia)
        console.log(this.props.noticia.hashtags)
        return (
            <Container >
                <Grid container spacing={3}>
                
                    <Grid item lg={7} md={7} xs={12}>
                    { !this.props.isFetching && (
                        <Card className={classes.card} style = {{marginTop: 15}} ref={this.myRef}>
                         <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.props.noticia.title}
                                </Typography>
                           </CardContent>
                           <CardMedia
                                className={classes.media}
                                src={this.props.noticia.urlToImage} component="img"
                                title={this.props.noticia.title}
                            /> 
                            <CardContent >
                                <div style = {{flex:1, justifyContent: 'space-between'}}>
                                <span style = {{maxWidth: '40%'}}>
                                <Typography variant="body2"  component="span">
                                    {this.props.noticia.source}
                                </Typography>
                                <br></br>
                                <Typography variant="body2" color="textSecondary" component="span" >
                                    {convertDate(this.props.noticia.publishedAt)}
                                </Typography>
                                </span>
                                
                                </div>
                           </CardContent>
                            
                            <CardContent>
                                <Typography gutterBottom variant="subtitle1" component="h2">
                                    {this.props.noticia.description}<br></br> 
                                </Typography>
                                <Typography variant="subtitle2" component="p">
                                        [Para continuar lendo, acesse à fonte original embaixo]
                                </Typography>
                            </CardContent>

                            <CardActions disableSpacing style = {{flex: 1, justifyContent: isMobile ? '' : 'space-between', flexDirection: isMobile ? 'column' : 'row' }}>
                            <Box>
                            <span>
                                    <Typography variant="body2" color="textSecondary" component="span" >
                                        {this.props.noticia.up}
                                    </Typography >
                                    <IconButton style={{color: this.state.upped ?'#ed4956' : '#c6c6c6', marginLeft: -10}}
                                        
                                        onClick={() => {
                                            if(!this.state.upped){
                                                axios.get('http://noticieiro.com:3444/api/noticias/up/' + this.props.noticia._id).then(() => {
                                                    this.props.noticia.up = this.props.noticia.up + 1
                                                    this.setState({
                                                        upped: true
                                                    })
                                                })
                                                
                                            }
                                            
                                        }}
                                    >
                                        <FontAwesomeIcon icon={Icons.faHeart}  />
                                    </IconButton>
                                    <Typography variant="body2" color="textSecondary" component="span" >
                                        {this.props.noticia.visits}
                                    </Typography >
                                    <IconButton style={{color: '#c6c6c6', marginLeft: -10}} 
                                    spy="true" smooth="true" offset={50} duration={500}  to="test2"
                                        onClick = {()=> {
                                           this.myRef.current.scrollIntoView({behavior: 'smooth'})
                                        }}>
                                        <FontAwesomeIcon icon={Icons.faEye}  />
                                    </IconButton>
                                    <Typography variant="body2" color="textSecondary" component="span" >
                                        {this.props.comments.length}
                                    </Typography >
                                    <IconButton style={{color: '#c6c6c6', marginLeft: -10}}
                                        spy="true" smooth="true" offset={50} duration={500}  to="test2"
                                        onClick = {()=> {
                                        this.commentsRef.current.scrollIntoView({behavior: 'smooth'})
                                        }}>
                                        <FontAwesomeIcon icon={Icons.faComment}  />
                                    </IconButton>
                                   
                                </span>
                            </Box>
                            <BrowserView>
                                <Box>
                                    <Typography gutterBottom variant="subtitle1" component="span" style={{fontSize: 13}}>
                                        Compartilhe
                                    </Typography>
                                    
                                    <IconButton id="facebook_browser">
                                    <FacebookShareButton 
                                            url={`http://noticieiro.com/lnoticias/${this.props.noticia._id}/category/${this.props.categoryName}`}>
                                        <Avatar style = {{background: '#365899'}}>
                                                <i className="fa fa-facebook" aria-hidden="true" style={{color: '#FFFFFF', }}></i>
                                        </Avatar>
                                        </FacebookShareButton>
                                    </IconButton>
                                    
                                    <IconButton id="twitter_browser">
                                    <TwitterShareButton 
                                            url={`http://noticieiro.com/lnoticias/${this.props.noticia._id}/category/${this.props.categoryName}`}
                                            title={this.props.noticia.title}>
                                        <Avatar style = {{background: '#1b95e0'}}>
                                        
                                              
                                            <i className="fa fa-twitter" aria-hidden="true" style={{color: '#FFFFFF', }}></i>
                                            
                                        </Avatar>
                                        </TwitterShareButton>
                                    </IconButton>
                                </Box>
                                </BrowserView>
                                <MobileView>
                                <Box>
                                    <Typography gutterBottom variant="subtitle1" component="p" style={{fontSize: 13, textAlign: 'center', marginBottom: -20}}>
                                        Compartilhe
                                    </Typography><br></br>
                                        <IconButton id="whatsapp_mobile">
                                            <WhatsappShareButton  
                                                url={`http://noticieiro.com/lnoticias/${this.props.noticia._id}/category/${this.props.categoryName}`}
                                                title={this.props.noticia.title}>
                                            <Avatar style = {{background: '#07e676'}}>
                                                <i className="fa fa-whatsapp" aria-hidden="true" style={{color: '#FFFFFF', }}></i>
                                            </Avatar>
                                            </WhatsappShareButton>
                                        </IconButton>
                                        <IconButton id="telegram_mobile">
                                            <TelegramShareButton 
                                                url={`http://noticieiro.com/lnoticias/${this.props.noticia._id}/category/${this.props.categoryName}`}
                                                title={this.props.noticia.title}>
                                            <Avatar style = {{background: '#259cd7'}}>
                                              <i class="fa fa-telegram" aria-hidden="true"></i>
                                               
                                            </Avatar>
                                            </TelegramShareButton>
                                        </IconButton>
                                    <IconButton id="facebook_mobile">
                                    <FacebookShareButton 
                                            url={`http://noticieiro.com/lnoticias/${this.props.noticia._id}/category/${this.props.categoryName}`}>
                                        <Avatar style = {{background: '#365899'}}>
                                                <i className="fa fa-facebook" aria-hidden="true" style={{color: '#FFFFFF', }}></i>
                                        </Avatar>
                                        </FacebookShareButton>
                                    </IconButton>
                                    
                                    <IconButton id="twitter_mobile">
                                    <TwitterShareButton 
                                            url={`http://noticieiro.com/lnoticias/${this.props.noticia._id}/category/${this.props.categoryName}`}
                                            title={this.props.noticia.title}>
                                        <Avatar style = {{background: '#1b95e0'}}>
                                        
                                              
                                            <i className="fa fa-twitter" aria-hidden="true" style={{color: '#FFFFFF', }}></i>
                                            
                                        </Avatar>
                                        </TwitterShareButton>
                                    </IconButton>
                                </Box>
                                </MobileView>
                            </CardActions>
                            <CardContent>
                            <AdSense.Google
                                        client='ca-pub-2353493360641578'
                                        slot='8439034785'
                                        style={{ display: 'block'}}
                                        format='auto'
                                        responsive='true'
                                    />
                            </CardContent>
                            <CardActions disableSpacing style = {{flex: 1, justifyContent: 'center' }}>
                               <Button color="primary" target="_blank" variant="contained" 
                                target="_blank" href={this.props.noticia.url}>Ver Enlace Original</Button>
                               
                            </CardActions>
                        </Card>
                        )
                    }
                    {this.props.isFetching && (
                                <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justify="center"
                                style={{marginTop: 30}}
                              >
                                    <CircularProgress />
                                </Grid>
                            )}
                    {!this.props.isFetching && (
                        <div ref={this.commentsRef}>
                            {this.props.comments.map(this.renderComment)}
                        </div>
                    )}
                    {!this.state.commented &&(
                        <Card style = {{marginTop: 15}}>
                            <CardContent>
                                    <Typography gutterBottom variant="h5" component="p">
                                        Escreva seu comentário
                                    </Typography>
                            </CardContent>
                            <CardContent style={{flex: 1, flexDirection: 'column'}}>
                                <Box style={{flex: 1, flexDirection: 'column'}}>
                                    <TextField
                                        id="comment-name"
                                        label="Nome"
                                        margin="normal"
                                        variant="filled"
                                        value={this.state.commentName}
                                        error = {this.state.commentNameError}
                                        onChange={e => this.setState({ commentName: e.target.value })}
                                    /><br></br>
                                    <TextField
                                        id="comment-description"
                                        label="Comentário"
                                        multiline
                                        rows="4"
                                        rowsMax="4"
                                        margin="normal"
                                        helperText="Escreva seu comentário aqui"
                                        variant="filled"
                                        fullWidth
                                        value={this.state.commentDescription}
                                        error = {this.state.commentDescriptionError}
                                        onChange={e => this.setState({ commentDescription: e.target.value })}
                                    /><br></br>
                                    <CardActions style = {{flex: 1, justifyContent: 'center'}}>
                                    <Button variant="contained" color="primary" onClick={ () => {
                                            let error = false
                                            if(this.state.commentName.length < 2){
                                                error = true
                                                this.setState({
                                                    commentNameError: true
                                                })
                                            }else{
                                                this.setState({
                                                    commentNameError: false
                                                })
                                            }
                                            if(this.state.commentDescription.length < 4){
                                                error  = true
                                                this.setState({
                                                    commentDescriptionError: true
                                                })
                                            }else{
                                                this.setState({
                                                    commentDescriptionError: false
                                                })
                                            }
                                            if(!error){
                                                let form = {
                                                    new: this.props.noticia._id,
                                                    author: this.state.commentName,
                                                    description: this.state.commentDescription,
                                                    up: 0
                                                }
                                                axios.post('http://noticieiro.com:3444/comments/', form)
                                                .then((resp) => {
                                                    console.log('respons', resp)
                                                    this.props.comments.push(resp.data)
                                                    this.setState({
                                                        commented: true
                                                    })
                                                })
                                            }
                                    }}>
                                        Enviar
                                    </Button>
                                    </CardActions>
                                </Box>
                            </CardContent>
                        </Card>
                    )}
                    
                    </Grid>
                    <Grid item lg={4} md={4} xs={12}>
                        <AppBar position="static" color="primary" style={{marginTop:15, marginLeft:12}}>
                            <Toolbar>
                            <Typography variant="h6" style={{color: 'white'}}>
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
                                        layoutKey='-gw-1+2a-9x+5c'
                                    />
                        <AppBar position="static" color="primary" style={{marginTop:15, marginLeft:12}}>
                            <Toolbar>
                            <Typography variant="h6"  style={{color: 'white'}}>
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
    scroll(ref) {
        ref.current.scrollIntoView({behavior: 'smooth'})
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

    filterMax(text){
        const max = 90
        if(text.length > max){
            return text.substring(0,max - 3) + '...'
        }else{
            return text
        }
    }


}

function convertDate(date){
   return  Moment(date).format('DD/MM/YYYY  hh:mm A')
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
const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: state.noticia.isFetching,
        noticia: state.noticia.data,
        error: state.noticia.error,
        visited: state.visited.visited,
        isFetchingVisited: state.visited.isFetching,
        liked: state.liked.liked,
        isFetchingLiked: state.liked.isFetching,
        categoryName: state.noticia.categoryName,
        comments: state.noticia.comments
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: (categoryName, id) => dispatch(loadNoticiaRequest(categoryName, id)),
        loadVisitedData: (categoryName) => dispatch(loadHomeVisitedRequest(categoryName)),
        loadLikedData: (categoryName) => dispatch(loadHomeLikedRequest(categoryName))
    
    }
} 
export default connect(mapStateToProps, mapDispatchToProps)(Noticia)