import React from 'react';
import {Sidebar, Menu, Grid, Segment, Item, Header} from 'semantic-ui-react';
import SidebarItems from './SidebarItems';
import HelmForm from './HelmForm';
import {tier1schema, tier1uischema} from './chart-tier-1';
import {cpxcicschema, cpxcicuischema} from './cpx-cic';

function Copyright() {
  return (
    <Segment attached={'bottom'} padded style={{marginTop: '2rem'}}>
      {'Copyright © '}
      <Item as={'a'} href="https://citrix.com/">
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
    console.log('Clicked on ' + itemName);
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
    console.log('Form id= ' + formId);
    console.log('Form data= ', formData[formId]);
    console.log('Yaml: ', yamlStrs[formId]);
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
      <>  
      <Header as={'h2'}>{formId}</Header>
      <Grid.Row>
          <HelmForm schema={schemaForForm(formId)}
                    uischema={uischemaForForm(formId)}
                    formData={formData}
                    yamlStr={yamlStr}
                    setParentState={setParentState}
          />
       </Grid.Row>
        </>
    );
  }

  return (
    <Sidebar.Pushable as={Segment}>

      <Sidebar
        as={Menu}
        inverted={true}
        vertical
        visible={true}
        width='wide'
      >
        <SidebarItems items={items} onClick={itemClick}/>
      </Sidebar>
      <Sidebar.Pusher>
        <Grid padded container>
          <MainContent
            formId={formId}
            formData={formData[formId]}
            yamlStr={yamlStrs[formId]}
            setParentState={setParentState}
          />
        </Grid>
        <Copyright/>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

