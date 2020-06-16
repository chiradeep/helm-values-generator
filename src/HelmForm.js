import React from 'react';
import './App.css';
//import Form from '@rjsf/core';
import Form from "@rjsf/material-ui";
import yaml from 'js-yaml';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import { Typography, Grid, Box } from '@material-ui/core';


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

		/*var x = {};
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
        }*/
        var x = JSON.parse(JSON.stringify(formData));
        if (x["spec"] && x["spec"]["backend"] && Object.entries(x["spec"]["backend"]).length === 0) {
            delete x["spec"]["backend"];
        }
        if (x["metadata"] && x["metadata"]["annotations"]) {
            x["metadata"]["annotations"] = {};
        }

       if (formData["metadata"] && formData["metadata"]["annotations"]){
           formData["metadata"]["annotations"].forEach(function(item, index, array){
             x["metadata"]["annotations"][item["annotation"]] = item["value"];
           })
       }
		var yamlStr = yaml.safeDump(x, {sortKeys: true, skipInvalid: true });
		console.log(yamlStr);
		this.setState({formData: {...formData}, yamlStr: yamlStr});
		this.props.setParentState(this.props.formId, {...formData}, yamlStr);
	}

	render() {
	  return (
		  <Grid container direction="row" justify="space-around" alignItems="flex-start" spacing={1}>
		  		<Grid item sm={6}>
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
		  		</Grid>
			    <Divider orientation="vertical" flexItem/>
				<Grid item sm={5}>
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
