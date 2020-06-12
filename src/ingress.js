export const ingressschema = {
  properties: {
        metadata: {
            type: "object",
            title: "Ingress Metadata",
            required: ["name"],
            properties: {
                "apiVersion" : {type: "string", default: "extensions/v1beta1"},
                "kind": {type: "string", default: "Ingress"},
                "name": {type: "string", title: "Ingress Name"},
                "namespace": {type: "string", title: "Namespace", default: "default"}
            }
        },
		"spec": {
            type: "object",
            properties: {
                "rules": {
			    type: "array",
			    items: {
                    type: "object",
                    properties : {
                        "host": {type: "string"},
                        "http": {
                            type: "object",
                            properties: {
                              "paths" : {
                                type: "array",
                                items: {
                                     type: "object",
                                     properties: {
                                        "backend": {
                                            type: "object",
                                            properties: {
                                                "serviceName": {type: "string"},
                                                "servicePort": {type: "number"}
                                            },
                                        },
                                        "path": {type: "string"},
                                        "required": ["backend"]                                  
                                        },
                                    },
                                },
                            }
                            
                        }
                    }
                },
            }
            },
		},
		labelsAndAnnotations: {
			type: "object",
			title: "Labels and Annotations",
			properties: {
				'kubernetesURL': {type: "string", title: "Kubernetes API-server URL", format:"url"},
				'license.accept': {type: "boolean", title: "Accept License", default: true},
				'ingressClass': {type: "string", title: "Ingress Class for the controller"},
				'logLevel': {type: "string", default: "DEBUG", title: "Ingress Controller Log Level", enum:["DEBUG", "INFO", "WARN", "ERROR", "TRACE"]},
			}
		},
		sslSettings: {
			type: "object",
			title: "SSL/TLS Certificates",
			properties: {
				'cic.image': {type: "string", title: "Citrix Ingress Controller Image", default:"quay.io/citrix/citrix-k8s-ingress-controller:1.7.6"},
				'cic.pullpolicy': {type: "string", default: "IfNotPresent", title: "Image Pull Policy", enum: ["Always", "IfNotPresent", "Never"]}
			}
		}
		
	},
};

export const ingressuischema = {
    spec: {
        "ui:widget": "hidden",
        "rules": {
            "ui:widget": "hidden",
            "ui:order": ["host", "http"]
        }
    },
    metadata: {
    "apiVersion": {"ui:widget": "hidden"},
    "kind" : {"ui:widget": "hidden"}
    }
}
