import React from 'react';
import './App.css';
//import Form from '@rjsf/core';
import Form from "@rjsf/material-ui";
import yaml from 'js-yaml';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Divider from '@material-ui/core/Divider';
import { Typography, Grid, Box } from '@material-ui/core';



const schema = {
  properties: {
		adcSettings: {
			type: "object",
			title: "ADC Settings",
			required: ["nsIp"],
			properties: {
				nsIp: {type: "string", title: "Citrix ADC IP", format:"ipv4"},
				nsPort: {type: "number", title: "ADC Port",  default: 443, maximum: 64000, minimum:1},
				nsVIP: {type: "string", title: "Virtual IP for the clients to connect to", format:"ipv4"},
				nsProtocol: {type: "string", title: "ADC Management Protocol", enum:["HTTPS", "HTTP"], default: "HTTPS"},
				nsNamespace: {type: "string", title: "ADC Entity Prefix"},
				defaultSSLCert: {type: "string", title: "Default SSLCert"},
				nodeWatch: {type: "boolean", title: "Node Watch", default: false},
			}
		},
		deploymentSettings: {
			type: "object",
			title: "Deployment Settings",
			properties: {
				'kubernetesURL': {type: "string", title: "Kubernetes API-server URL", format:"url"},
				'license.accept': {type: "boolean", title: "Accept License", default: false},
				'ingressClass': {type: "string", title: "Ingress Class for the controller"},
				'logLevel': {type: "string", default: "DEBUG", title: "Ingress Controller Log Level", enum:["DEBUG", "INFO", "WARN", "ERROR", "TRACE"]},
			}
		},
		cicImageSettings: {
			type: "object",
			title: "Citrix Ingress Controller Image Settings",
			properties: {
				'cic.image': {type: "string", title: "Citrix Ingress Controller Image", default:"quay.io/citrix/citrix-k8s-ingress-controller:1.7.6"},
				'cic.pullpolicy': {type: "string", default: "IfNotPresent", title: "Image Pull Policy", enum: ["Always", "IfNotPresent", "Never"]}
			}
		},
		exporterSettings: {
			type: "object",
			title: "Citrix ADC Metrics Exporter Settings",
			properties: {
				'exporter.required': {type: "boolean", title: "Exporter Required"},
				
			},
			dependencies: {
				'exporter.required': {
					oneOf: [
						{
							"properties": {
							  "exporter.required": {
								const: false
							  }
							}
						},
						{
							"properties": {
							  "exporter.required": {
								const: true
							},
							'exporter.image': {type: "string", title: "Citrix ADC Metrics Exporter Image", default:'quay.io/citrix/citrix-adc-metrics-exporter:1.4.0'},
							'exporter.pullpolicy': {type: "string", default: "IfNotPresent", title: "Image Pull Policy", enum: ["Always", "IfNotPresent", "Never"]},
							'exporter.ports.containerPort': {type: "number", title: "Exporter Container Port", default: 8888, minimum:1, maximum:64000}		
							}
						}
					]
					
				}
			}
		}
	},
};

const uischema = {
	adcSettings: {
		"nsIp" : {
			"ui:help": "Citrix ADC NSIP/SNIP, SNIP in case of HA (mgmt has to be enabled)"
		},
		"nsNamespace": {
			"ui:help": "Resources created on the ADC will have this prefix in their name"
		},
		"defaultSSLCert": {
			"ui:help": "Secret containing the default ceritifcate for SSL vservers"
		},
		"nodeWatch": {
			"ui:help": "When checked, routes on the Citrix ADC are automatically configured to point to the pod networks on the nodes",
		}
	},
	deploymentSettings: {
		"license.accept": {
			"ui:help": "Accept the terms and conditions of the Citrix license. This is mandatory"
		} 
	}
}

const log = (type) => console.log.bind(console, type);


class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {formData: {}, yamlStr: ' '};
		this.toYaml = this.toYaml.bind(this);
	}

	toYaml({formData}) {
		console.log({formData});

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
					<Form schema={schema}
						  formData={this.state.formData}
						  liveValidate={true}
						  showErrorList={false}
						  uiSchema={uischema}
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

export default App;
