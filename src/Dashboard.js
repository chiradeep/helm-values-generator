import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SidebarItems from './SidebarItems';
import HelmForm from './HelmForm';
import { tier1schema, tier1uischema } from './chart-tier-1';
import { cpxcicschema, cpxcicuischema } from './cpx-cic';
import {ingressschema, ingressuischema} from './ingress';
import {contentroutingschema, contentroutinguischema} from './contentrouting';





function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://citrix.com/">
        Citrix Systems
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 800,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const items = ['Citrix ADC in Tier 1',
        'CPX in Tier 2',
        'Istio Ingress Gateway',
        'CPX as Istio Sidecar',
        'Ingress',
        'Content Routing'];
  const [open, setOpen] = React.useState(true);
  const [formId, setformId] = React.useState('Citrix ADC in Tier 1');
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const itemClick = (itemName, e) => {
    console.log("Clicked on " + itemName);
    setformId(itemName);
  }

  const [formData] = React.useState({
    [items[0]]: {},
    [items[1]]: {},
    [items[2]]: {},
    [items[3]]: {},
    [items[4]]: {},
    [items[5]]: {},
});
const [yamlStrs] = React.useState({
    [items[0]]: '',
    [items[1]]: '',
    [items[2]]: '',
    [items[3]]: '',
    [items[4]]: '',
    [items[5]]: ''
});

  //let formData  = {[items[0]]: {}, [items[1]]: {}, [items[2]]: {}, [items[3]]: {}};
  //let yamlStrs  = {[items[0]]: '', [items[1]]: '', [items[2]]: '', [items[3]]: ''};

  const setParentState = (formId, data, yamlStr) => {
    //setFormData(prevFormData => ({...prevFormData, [formData[formId]]:data}));
    //setYamlStrs(prevYamlStrs =>({...prevYamlStrs, [prevYamlStrs[formId]]: yamlStr}));
    //formData = {...formData, [formData[formId]]:data};
    formData[formId] = data;
    yamlStrs[formId] = yamlStr;
    console.log("Form id= " + formId);
    console.log("Form data= ", formData[formId]);
    console.log("Yaml: ",  yamlStrs[formId]);
  }

  const schemaForForm = (formId) => {
    //TODO
    switch (formId) {
      case items[0]:
        return tier1schema;
      case items[1]:
        return cpxcicschema;
      case items[4]:
        return ingressschema;
      case items[5]:
        return contentroutingschema;
      default:
        return tier1schema;
    }
  }

    const uischemaForForm = (formId) => {
        //TODO
        switch (formId) {
            case items[0]:
                return tier1uischema;
            case items[1]:
                return cpxcicuischema;
            case items[4]:
                return ingressuischema;
            case items[5]:
                return contentroutinguischema;
            default:
                return tier1uischema;
    }
  }
  

  const MainContent = ({formId, formData, yamlStr}) => {
      return (
        <Paper className={fixedHeightPaper}>
          <Typography variant="h5" color="primary">{formId}</Typography>
          <HelmForm schema={schemaForForm(formId)}  
                    uischema={uischemaForForm(formId)} 
                    formId={formId}
                    formData={formData} 
                    yamlStr={yamlStr}
                    setParentState={setParentState}/>
        </Paper>
      );

    } 

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h2" variant="h6" color="inherit" noWrap className={classes.title}>
            Citrix Helm Charts Values Generator
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><SidebarItems items={items} onClick={itemClick}/></List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container  className={classes.container}>
          <Grid container spacing={3}>
            <MainContent
              formId={formId}
              formData={formData[formId]}
              yamlStr={yamlStrs[formId]}
              setParentState={setParentState}
            />
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

