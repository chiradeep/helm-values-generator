import React from 'react';
import './App.css';
//import Form from '@rjsf/core';
import Form from "@rjsf/material-ui";
import yaml from 'js-yaml';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Divider from '@material-ui/core/Divider';
import { Typography, Grid, Box } from '@material-ui/core';


const log = (type) => console.log.bind(console, type);


class HelmForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {formData: {}, yamlStr: ' '};
		this.toYaml = this.toYaml.bind(this);
	}

	toYaml({formData}) {
		//console.log({formData});

		var x = {};
		for (let group in formData) {
			for (let k in formData[group]) {
				var splits = k.split("."); //e.g., exporter.ports.containerPorts
				var q = formData[group][k];
				if (q) { //sometimes it is 'undefined' leading to exceptions in safeDump
					var p = x;
					for (let t of splits.slice(0,-1) ) {
						if (!(t in p)) {
							p[t] = {};
						}
						p = p[t];
					}
					p[splits.slice(-1)] = q;
				}
			}
		}
		if (!formData.exporterSettings['exporter.required']) {
			delete x.exporter;
		}
		var yamlStr = yaml.safeDump(x);
		//console.log(yamlStr);
		this.setState({formData: {...formData}, yamlStr: yamlStr});
	}

	render() {
	  return (
		  <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3}>
		  		<Grid item sm={4}>
					<Form schema={this.props.schema}
						  formData={this.state.formData}
						  liveValidate={true}
						  showErrorList={false}
						  uiSchema={this.props.uischema}
                          onChange={this.toYaml}
                          onSubmit={this.toYaml}
                          onError={log("errors")}>
						<div>
      						<button type="submit" className="btn btn-primary">Generate values.yaml</button> 
						</div>
					</Form>
		  		</Grid>
			    <Divider orientation="vertical" flexItem/>
				<Grid item sm={6}>
					<Box p="1.5rem" color="grey">
						<Typography variant="h5">Values.yaml</Typography>
						<Divider />
					</Box>
					<Box p="1.5rem" >
						<SyntaxHighlighter language="yaml">
     						 {this.state.yamlStr}
    					</SyntaxHighlighter>
					</Box>
				</Grid>
		  </Grid>
	  );
	}
}

export default HelmForm;
