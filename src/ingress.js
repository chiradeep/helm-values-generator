export const ingressschema = {
    properties: {
        "apiVersion": { type: "string", default: "extensions/v1beta1" },
        "kind": { type: "string", default: "Ingress" },
        metadata: {
            type: "object",
            title: "Ingress Metadata",
            required: ["name"],
            properties: {
                "name": { type: "string", title: "Ingress Name" },
                "namespace": { type: "string", title: "Namespace", default: "default" },
                "annotations": {
                    "type": "array",
                    "items": {
                        type: "object",
                        "properties": {
                            "annotation": {
                                type: "string",
                                title: "annotation",
                                "enum": [
                                    "ingress.citrix.com/frontend-ip",
                                    "ingress.citrix.com/secure-port",
                                    "ingress.citrix.com/insecure-port",
                                    "ingress.citrix.com/insecure-termination",
                                    "ingress.citrix.com/secure-backend",
                                    "kubernetes.io/ingress.class",
                                    "ingress.citrix.com/secure-service-type",
                                    "ingress.citrix.com/insecure-service-type",
                                    "ingress.citrix.com/path-match-method",
                                    "ingress.citrix.com/deployment",    
                                ]
                            },
                            "value": {type: "string"}
                        }
                    },
                }
            }
        },
        "spec": {
            type: "object",
            properties: {
                "backend": {
                    type: "object",
                    description: "Default backend when no rules match (optional)",
                    properties: {
                        "serviceName": { type: "string" },
                        "servicePort": { type: "number" }
                    },
                },
                "rules": {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            "host": { type: "string" },
                            "http": {
                                type: "object",
                                properties: {
                                    "paths": {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                "backend": {
                                                    type: "object",
                                                    properties: {
                                                        "serviceName": { type: "string" },
                                                        "servicePort": { type: "number" }
                                                    },
                                                },
                                                "path": { type: "string" },
                                                "required": ["backend"]
                                            },
                                        },
                                    },
                                }

                            }
                        }
                    },
                },
                tls: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            "hosts": {
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            },
                            "secretName": {
                                type: "string"
                            }
                        }
                    }
                }
            },
        },

    },
};

export const ingressuischema = {
    "metadata": {
        "annotations": {
            "ui:options": {
                orderable: false
            },
        },
    },
    "spec": {
        "rules": {
            "ui:options": {
                orderable: false
            },
            items: {
                "host": {"ui:placeholder": "foo.com"}
            }
        }
    },
    "apiVersion": {"ui:disabled": true},
    "kind" : {"ui:disabled": true}
}
