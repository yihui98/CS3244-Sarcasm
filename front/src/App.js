import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import modelService from './services/model'
import {Link} from 'react-scroll'
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from 'prop-types';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

import workflow from './images/workflow.png'
import eda from './images/eda.png'
import preprocessingSummary from './images/preprocessingSummary.png'
import newFeatures from './images/newFeatures.png'
import heatmap from './images/heatmap.png'
import featuresSummary from './images/featuresSummary.png'
import linear from './images/linear.png'
import ensemble from './images/ensemble.png'
import deep from './images/deep.png'
import confusion from './images/confusion.png'
import words from './images/words.png'

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
  
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  drawer: {
    width: 200,
    flexShrink: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  drawerPaper: {
    width: 200,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



function App() {
  const [query, setQuery] = useState("")
  const [result, setResults] = useState("Waiting for input")
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const handleTextChange =  (event) =>{
    console.log(event.target.value)
    setQuery(event.target.value)
    
  }
/*
  useEffect(() =>{
    async function checksentiment(){
      if (query === ""){
        setResults("Waiting for input")
      } else{
        const results = await modelService.getSentiment(query)
        setResults(results.score)
      }
      
    }
    checksentiment()
    
  },[query])
*/
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };  


const buttonPress = async () => {
  if (query === ""){
    setResults("Waiting for input")
  }else{
    const results = await modelService.getSentiment(query)
    setResults(results.score)
  }
}

  return (

    <div id = "top" >
      <HideOnScroll>
      <AppBar position="sticky" style={{ background: "linear-gradient(45deg, #249cdb 30%, #2dd27e 90%)" }}>
          <Toolbar>
          <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Team 34
            </Typography>
          </Toolbar>
        </AppBar>
        </HideOnScroll>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <List >
                <Link to = "top" spy={true} smooth={true} style={{ textDecoration: 'none', color: "black"}}>
                  <ListItem button>
                    <ListItemText primary= "Home" />
                  </ListItem>
                </Link>
                <Link to = "motivation" spy={true} smooth={true} style={{ textDecoration: 'none', color: "black"}}>
                  <ListItem button>
                    <ListItemText primary= "Motivation" />
                  </ListItem>
                </Link>
                <Link to = "methods" spy={true} smooth={true} style={{ textDecoration: 'none', color: "black"}}>
                  <ListItem button>
                    <ListItemText primary= "Methods" />
                  </ListItem>
                </Link>
                <Link to = "preprocessing" spy={true} smooth={true} style={{ textDecoration: 'none', color: "black"}}>
                  <ListItem button>
                    <ListItemText primary= "Preprocessing" />
                  </ListItem>
                </Link>
                <Link to = "models" spy={true} smooth={true} style={{ textDecoration: 'none', color: "black"}}>
                  <ListItem button>
                    <ListItemText primary= "Models" />
                  </ListItem>
                </Link>
                <Link to = "conclusion" spy={true} smooth={true} style={{ textDecoration: 'none', color: "black"}}>
                  <ListItem button>
                    <ListItemText primary= "Conclusion" />
                  </ListItem>
                </Link>
          </List>
        </Drawer>
        <Box 
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              CS3244 Sarcasm Model
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            This model was created by training the data on the <a href = 'https://www.kaggle.com/danofer/sarcasm' style={{"text-decoration":"none", "color": "inherit"}} >Reddit sarcasm dataset </a>
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >     
            <TextField fullWidth sx={{ m: 1 }} id="outlined-basic" label="Try it now! Input your text here" variant="outlined" value = {query} onChange = {handleTextChange}  multiline/>  
            <Tooltip title = "Generate Sentiment">
              <IconButton aria-label="add" onClick = {buttonPress}>
                  <AutoFixHighIcon />
              </IconButton> 
            </Tooltip>
            
            </Stack>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >     
            <div> Score : </div>
            <div> {result} </div>
            </Stack>
          </Container>
        </Box>
        <Box>
        <Container sx={{ py: 8 }} maxWidth="md" id = "motivation">
        <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            > Motivation</Typography>

        <div> Misunderstandings and arguments can result from readers’ misinterpretation of a sarcastic remark as a serious one.
        As such, we aim to create a one-size-fits-all sarcasm detection model to enables writers, on different platforms such as Reddit or traditional news media, to comment freely without the fear of offending someone else.
        </div>
        </Container>
          
        <Container sx={{ py: 2 }} maxWidth="md" id = "methods">
        <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            > Our Methods</Typography>

        <div style = {{  'white-space': 'pre-wrap'}}> 
          Our general approach to tackling this problem is by splitting our workload into 2 parts; 
          2 of our members will be in charge of data processing while the other 3 will be working on the models. {'\n'} {'\n'}
          Data processing contains of several components such as data cleaning, data preprocessing, feature engineering and finally feature selection. {"\n"} {"\n"}

          While data modeling entails training and testing a suite of models, hyperparameter tuning, evaluation and analysis of the model's performance. The high-level workflow is shown below. {"\n"} {"\n"}
           
          </div>
          <img src={workflow} alt="Logo" maxWidth="md" style = {{"width":'100%', "height":'100%',}}/>

        
        </Container>
        <Container sx={{ py: 2 }} maxWidth="md" id = "preprocessing">
        <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            > Preprocessing</Typography>
            <div style = {{  'white-space': 'pre-wrap'}}> 

            Firstly, we begin by examining our dataset. By performing an exploratory data analysis, we are able to identify the type of data that we are working with.
            A summary of our dataset is shown below {'\n'} {'\n'}

            <img src={eda} alt="eda" maxWidth="md" style = {{"width":'100%', "height":'100%',}}/> {'\n'} {'\n'}

            We can see that after filtering, the class distribution remains balanced. We now perform a wide range of data preprocessing methods such as Word Normalization, N-grams and TF-IDF.
            A summary of our results can be seen below {'\n'} {'\n'}

            <img src={preprocessingSummary} alt="preprocessingSummary" maxWidth="md" style = {{"width":'100%', "height":'100%',}}/> {'\n'} {'\n'}

            Finally, we proceed on with feature engineering and feature selection. A summary of our top distinguishing new features can be seen below.
            
            <img src={newFeatures} alt="newFeatures" maxWidth="md" style = {{"width":'100%', "height":'100%',}}/> {'\n'} {'\n'}

            We are able to see that no single feature has a large distinct horizontal non-overlap and if we include every new feature, it will add too much noise to our data.
            As such, we decided to limit features that have the least overlap in histogram plots between the two classes.

            <img src={heatmap} alt="heatmap" maxWidth="md" style = {{"width":'100%', "height":'100%',}}/> {'\n'} {'\n'}

            A summary of our results can be seen below. {'\n'} {'\n'}

            <img src={featuresSummary} alt="featuresSummary" maxWidth="md" style = {{"width":'100%', "height":'100%',}}/> {'\n'} {'\n'}

            As per our initial hypothesis of lack of disjointness of classes in new features, adding any of the new feature tend to worsen performance. Some features like 'avg_wordlength'
            will heavily skew prediction of the test set towards one class. Thus, we decided to stick to our initial bag-of-words, 1-2 grams approach for better generalization of new data.


            </div>
        </Container>
        <Container sx={{ py: 2 }} maxWidth="md" id = "models">
        <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            > Models </Typography>
        <div style = {{  'white-space': 'pre-wrap'}}> 
          Using the preprocessed data, we perform training on the dataset by using a wide range of models from linear to deeplearning. This includes linear model such as Logistic Regression,
          ensemble methods such as Random Forest classification and deep learning methods such as Recurrent Neural Networks. {'\n'} {'\n'}

          Our results are as follows: {'\n'} {'\n'}

          <Typography
              component="h4"
              variant="h4"
              color="text.primary"
              gutterBottom
            > Linear / Non-linear models: </Typography> 

          <img src={linear} alt="linear" maxWidth="md" style = {{"width":'100%', "height":'100%',}}/> {'\n'} {'\n'}

          <Typography
              component="h4"
              variant="h4"
              color="text.primary"
              gutterBottom
            > Ensemble Methods: </Typography>  {'\n'} {'\n'}

          <img src={ensemble} alt="ensemble" maxWidth="md" style = {{"width":'100%', "height":'100%',}}/> {'\n'} {'\n'}

          <Typography
              component="h4"
              variant="h4"
              color="text.primary"
              gutterBottom
            > Deep Learning: </Typography> {'\n'} {'\n'}

          <img src={deep} alt="deep" maxWidth="md" style = {{"width":'100%', "height":'100%',}}/> {'\n'} {'\n'}

        </div>
        </Container>

        <Container sx={{ py: 2 }} maxWidth="md" id = "conclusion">
        <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            > Conclusion </Typography>
        <div style = {{  'white-space': 'pre-wrap'}}> 
          Can our best models generalise well to other sarcastic contents such as News Headlines? {'\n'} {'\n'}

          Sadly no, a 83% accuracy ExtraTrees Ensemble Model can only predict 51.7% of the News headlines correctly. This is only slightly better than making a randomized choice. {'\n'} {'\n'}
        
          <img src={confusion}  maxWidth="md" alt="confusion"  style = {{"width":'50%', "height":'100%',}}/> {'\n'} {'\n'}

          One reason for this could be because the important words found in News headlines do not exist in the TF-IDF features. If we take a look at the words found in News headlines vs 
          Reddit comments, we can see that News headlines are generally more formal and made up of actual English words. {'\n'} {'\n'}

          <img src={words}  maxWidth="md" alt="words"  style = {{"width":'100%', "height":'100%',}}/> {'\n'} {'\n'}

          To improve on the accuracy, in the future we will train our models on both formal and informal datasets so that our models are able to learn the context of the data and hopefully produce better results.

        </div>
        </Container>
        <Link to = "top" spy={true} smooth={true} style={{ textDecoration: 'none', color: "black"}}>
        <Fab color="primary" size="medium" aria-label="scroll back to top" style = {{  'position': 'sticky', 'bottom': '8%', 'left': '92%',}}>
          <KeyboardArrowUpIcon />
        </Fab>
        </Link>
        </Box>
</div>
  );
}

export default App;
