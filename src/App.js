import React from 'react';
import './App.css';
import Form from '@rjsf/core';
import yaml from 'js-yaml';


const schema = {
  properties: {
		adcSettings: {
			type: "object",
			title: "ADC Settings",
			required: ["nsIp"],
			properties: {
				nsIp: {type: "string", title: "Citrix ADC IP"},
				nsPort: {type: "string", title: "ADC Port",  default: "443"},
				nsVIP: {type: "string", title: "Virtual IP for the clients to connect to", },
				nsProtocol: {type: "string", title: "ADC Management Protocol", default: "HTTPS"},
				nsNamespace: {type: "string", title: "ADC Entity Prefix"},
				defaultSSLCert: {type: "string", title: "Default SSLCert"},
				nodeWatch: {type: "boolean", title: "Node Watch", default: false},
			}
		},
		deploymentSettings: {
			type: "object",
			title: "Deployment Settings",
			properties: {
				'kubernetesURL': {type: "string", title: "Kubernetes API-server URL"},
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
				'exporter.required': {type: "boolean", title: "Exporter Required", default: true},
				'exporter.image': {type: "string", title: "Citrix ADC Metrics Exporter Image", default:"quay.io/citrix/citrix-adc-metrics-exporter:1.4.0"},
				'exporter.pullpolicy': {type: "string", default: "IfNotPresent", title: "Image Pull Policy", enum: ["Always", "IfNotPresent", "Never"]},
				'exporter.ports.containerPort': {type: "number", title: "Exporter Container Port", default: 8888}
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
			"ui:help": "Set to yes to accept the terms and conditions of the Citrix license."
		} 
	}
}

const log = (type) => console.log.bind(console, type);
//const onSubmit = ({formData}, e) => console.log("Data submitted: ",  JSON.stringify(formData));

function onSubmit({formData}, e) {
	var x = {};
	for (let group in formData) {
		for (let k in formData[group]) {
			var splits = k.split(".");
			var reverse = k.split(".").slice(1);
			var q = formData[group][k];
			var topLevel = splits[0];
		  if (reverse.length > 0) {
				if (!(topLevel in x)) {
					x[topLevel] = {};
				}
				var p = x[topLevel];
		 	 	for (let t of reverse.slice(0,-1)) {
					if (!(t in p)) {
						p[t] = {};
					} 
					p = p[t];
				}
				p[reverse.slice(-1)] = q;
			} else {
				x[topLevel] = q;
		}
		
		console.log(reverse);
		}
	}
	var yamlStr = yaml.safeDump(x);
	
	console.log(yamlStr);
}


class App extends React.Component {
	render() {
	  return (
		  <div className="col-sm-8">
		 		<div className="row">
				 <div className="col-sm-8">
				 </div>
		  		<div className="col-sm-8">
              <Form schema={schema}
		            		uiSchema={uischema}
                    onChange={log("changed")}
                    onSubmit={onSubmit}
                    onError={log("errors")} />
		  		</div>
		  	</div>
		  </div>
	  );
	}
}

export default App;
