import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import modelService from './services/model'


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };  


  return (

    <div>
      <AppBar position="static" style={{ background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)" }}>
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
                <Link to = "/" style={{ textDecoration: 'none', color: "black"}}>
                  <ListItem button>
                    <ListItemText primary= "Home" />
                  </ListItem>
                </Link>
                <Link to = {`/methods`} style={{ textDecoration: 'none', color: "black"}}>
                  <ListItem button>
                    <ListItemText primary= "Methods" />
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
            This model was created by training the data on the Reddit sarcasm dataset
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >     
            <TextField id="outlined-basic" label="Try it now! Input your text here" variant="outlined" value = {query} onChange = {handleTextChange} />     
            <div> Score : {result} </div>
            </Stack>
          </Container>
        </Box>

        <Box>
        <Container sx={{ py: 8 }} maxWidth="md">
        <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            > Our Methods</Typography>

<div> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </div>
        </Container>
        <Container sx={{ py: 8 }} maxWidth="md">
        <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            > Preprocessing</Typography>
            <div> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </div>
        </Container>
        <Container sx={{ py: 8 }} maxWidth="md">
        <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            > Results </Typography>
        </Container>
        </Box>
</div>
  );
}

export default App;
