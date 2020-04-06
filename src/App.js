import React from 'react';
import './App.css';
import Form from "@rjsf/core"


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
			}
		},
		deploymentSettings: {
			type: "object",
			title: "Deployment Settings",
			properties: {
				'license.accept': {type: "boolean", title: "Accept License", default: false},
			}
		}
	},
};

const uischema = {
	adcSettings: {
		"nsIp" : {
			"ui:help": "Citrix ADC NSIP/SNIP, SNIP in case of HA (mgmt has to be enabled)"
		}
	},
	deploymentSettings: {
		"license.accept": {
			"ui:help": "Set to yes to accept the terms and conditions of the Citrix license."
		} 
	}
}

const log = (type) => console.log.bind(console, type);
const onSubmit = ({formData}, e) => console.log("Data submitted: ",  formData);


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
