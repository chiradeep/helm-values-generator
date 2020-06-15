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
                "namespace": { type: "string", title: "Namespace", default: "default" }
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
                    default: {}
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
    "spec": {
        "rules": {
            items: {
                "host": {"ui:placeholder": "foo.com"}
            }
        }
    },
    "apiVersion": {"ui:disabled": true},
    "kind" : {"ui:disabled": true}
}
