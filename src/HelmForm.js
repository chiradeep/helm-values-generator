import React from 'react';
import './App.css';
//import Form from '@rjsf/core';
//import Form from "@rjsf/material-ui";
import Form from "@chiradeep/rjsf-semantic-ui";

import yaml from 'js-yaml';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Button } from 'semantic-ui-react';
import { Grid } from 'semantic-ui-react';
import { Header } from 'semantic-ui-react'



const log = (type) => console.log.bind(console, type);


class HelmForm extends React.Component {
	constructor(props){
		super(props);
		this.state = {formData: {...props.formData}, yamlStr: props.yamlStr};
		this.toYaml = this.toYaml.bind(this);
		console.log("constructor: formData", this.props.formData);

	}

	componentDidMount() {
		console.log("componentDidMount: formData", this.props.formData);
		console.log("componentDidMount: yamlStr", this.props.yamlStr);
		console.log("componentDidMount: formId", this.props.formId);

		//this.setState({formData: {...this.props.formData}, yamlStr: this.props.yamlStr});
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
		console.log(yamlStr);
		this.setState({formData: {...formData}, yamlStr: yamlStr});
		this.props.setParentState(this.props.formId, {...formData}, yamlStr);
	}

	render() {
	  return (
		  <Grid columns={3} divided>
		  		<Grid.Column width={6}>
					<Form schema={this.props.schema}
						  formData={this.state.formData}
						  liveValidate={true}
						  showErrorList={false}
						  uiSchema={this.props.uischema}
                          onChange={this.toYaml}
                          onSubmit={this.toYaml}
                          onError={log("errors")}>
						<div>
      						<Button type="submit" variant="contained" color="primary">Generate values.yaml</Button> 
						</div>
					</Form>
		  		</Grid.Column>
				<Grid.Column width={5}>
					
						<Header size="small">Values.yaml</Header>
						<SyntaxHighlighter language="yaml">
     						 {this.state.yamlStr}
    					</SyntaxHighlighter>
				</Grid.Column>
		  </Grid>
	  );
	}
}

export default HelmForm;
