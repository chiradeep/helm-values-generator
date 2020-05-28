import React from 'react';
/* import clsx from 'clsx';
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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'; */
import {Segment, Item, Container, Header} from 'semantic-ui-react';
import {Sidebar, Menu, Grid} from 'semantic-ui-react';
import SidebarItems from './SidebarItems';
import HelmForm from './HelmForm';
import { tier1schema, tier1uischema } from './chart-tier-1';
import { cpxcicschema, cpxcicuischema } from './cpx-cic';



function Copyright() {
  return (
    <Segment color="textSecondary" align="center">
      {'Copyright © '}
      <Item color="inherit" href="https://citrix.com/">
        Citrix Systems
      </Item>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Segment>
  );
}


export default function Dashboard() {
  const items = ['Citrix ADC in Tier 1', 'CPX in Tier 2', 'Istio Ingress Gateway', 'CPX as Istio Sidecar'];

  
  const [formId, setformId] = React.useState('Citrix ADC in Tier 1');
  /*const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };*/


  const itemClick = (itemName, e) => {
    console.log("Clicked on " + itemName);
    setformId(itemName);
  }

  const [formData] = React.useState({[items[0]]: {}, [items[1]]: {}, [items[2]]: {}, [items[3]]: {}});
  const [yamlStrs] = React.useState({[items[0]]: '', [items[1]]: '', [items[2]]: '', [items[3]]: ''});

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
      default:
        return tier1uischema;
    }
  }

  const MainContent = ({formId, formData, yamlStr}) => {
      return (
        <Container>
          <Header size="small" color="primary">{formId}</Header>
          <HelmForm schema={schemaForForm(formId)}  
                    uischema={uischemaForForm(formId)} 
                    formId={formId}
                    formData={formData} 
                    yamlStr={yamlStr}
                    setParentState={setParentState}/>
        </Container>
      );

    } 

  return (
    <div>
      
      <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              vertical
              visible={true}
              width='thin'>
        <SidebarItems items={items} onClick={itemClick}/>
      </Sidebar>
      <main >
        <div />
        <Container>
          <Grid container spacing={3}>
            <MainContent
              formId={formId}
              formData={formData[formId]}
              yamlStr={yamlStrs[formId]}
              setParentState={setParentState}
            />
          </Grid>
          
            <Copyright />
        </Container>
      </main>
    </div>
  );
}

