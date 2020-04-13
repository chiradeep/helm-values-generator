import React from 'react';
import './App.css';
import HelmForm from './HelmForm';
import {tier1schema, tier1uischema} from './chart-tier-1'

class App extends React.Component {

	render() {
	  return (
		  <HelmForm schema={tier1schema} uischema={tier1uischema}/>
	  );
	}
}

export default App;
