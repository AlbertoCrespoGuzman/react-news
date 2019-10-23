import React, { Component } from 'react'
import { connect } from 'react-redux'
import Moment from 'moment'
import { Link } from 'react-router-dom'
import {
    BrowserView,
    MobileView,
    isMobile
  } from "react-device-detect"
  import AdSense from 'react-adsense' 
import { loadBioRequest } from './actions'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import ListItem from '@material-ui/core/ListItem'
import Grow from '@material-ui/core/Grow'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconButton from '@material-ui/core/IconButton'
import * as Icons from "@fortawesome/free-solid-svg-icons"
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import * as colors from '@material-ui/core/colors'

class Bio extends Component{
    constructor(props){
        super(props)

    }
    componentDidMount(){
        this.props.loadData()
        this.renderNoticia = this.renderNoticia.bind(this)
    }

    render(){
        return (
            
            <Container >
                <Grid container spacing={3}>
                
                    <Grid item lg={7} md={7} xs={12}>
                        <AppBar position="static" color="primary" style={{marginTop:15, marginLeft:12}}>
                            <Toolbar>
                            <Typography variant="h6" style={{color: 'white'}}>
                                Link na Bio do Instagram
                            </Typography>
                            </Toolbar>
                        </AppBar>
                        {!this.props.isFetching  && this.props.bio.map(this.renderNoticia)}
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
              <AdSense.Google
                    client='ca-pub-2353493360641578'
                    slot='9148647073'
                    style={{ display: 'block',width: 380, height: 600 }}
                    format=''
                    responsive='true'
                    layoutKey='-gw-1+2a-9x+5c'
                />
              </Grid>

            </Grid>
        </Container>
        )
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
function convertDate(date){
    return  Moment(date).format('DD/MM/YYYY  hh:mm A')
 }
const mapStateToProps = (state) => {
    return {
        isFetching: state.bio.isFetching,
        bio: state.bio.bio
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loadData: () => dispatch(loadBioRequest())
    }
} 
export default connect(mapStateToProps, mapDispatchToProps)(Bio)