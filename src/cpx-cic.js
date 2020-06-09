export const cpxcicschema = {
  properties: {
		cpxSettings: {
			type: "object",
			title: "CPX Settings",
			properties: {
				'cpx.image': {type: "string", title: "Citrix ADC CPX Image", default:"quay.io/citrix/citrix-k8s-cpx-ingress:13.0-47.103"},
				'cpx.pullpolicy': {type: "string", default: "IfNotPresent", title: "Image Pull Policy", enum: ["Always", "IfNotPresent", "Never"]},
				nsNamespace: {type: "string", title: "ADC Entity Prefix"},
				defaultSSLCert: {type: "string", title: "Default SSLCert"},
				lsIp: {type: "string", title: "License Server IP", format:"ipv4"},
				lsPort: {type: "number", title: "License Server Port", minimum:1, maximum:64000}
			}
		},
		deploymentSettings: {
			type: "object",
			title: "Deployment Settings",
			properties: {
				'license.accept': {type: "boolean", title: "Accept License", default: false},
				'ingressClass': {type: "string", title: "Ingress Class for the controller"},
				'openshift': {type: "boolean", title: "OpenShift Support", default: false},
				'logLevel': {type: "string", default: "DEBUG", title: "Ingress Controller Log Level", enum:["DEBUG", "INFO", "WARN", "ERROR", "TRACE"]},
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

export const cpxcicuischema = {
	cpxSettings: {
		"nsNamespace": {
			"ui:description": "Resources created on the CPX will have this prefix in their name"
		},
		"defaultSSLCert": {
			"ui:description": "Secret containing the default ceritifcate for SSL vservers"
		},
		"lsPort": {
			"ui:description": "Specify this only if the ADM license server port has been changed",
		}
	},
	deploymentSettings: {
		"license.accept": {
			"ui:description": "Accept the terms and conditions of the Citrix license. This is mandatory"
		} 
	}
}
