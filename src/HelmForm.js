import React from 'react';
import './App.css';
import { withTheme } from '@rjsf/core';
import { Theme as SemanticTheme } from '@chiradeep/rjsf-semantic-ui';

import yaml from 'js-yaml';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {Button, Header, Grid} from 'semantic-ui-react';

const log = (type) => console.log.bind(console, type);
const Form = withTheme(SemanticTheme);

class HelmForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {formData: {...props.formData}, yamlStr: props.yamlStr};
    this.toYaml = this.toYaml.bind(this);
    console.log('constructor: formData', this.props.formData);

  }

  componentDidMount() {
    console.log('componentDidMount: formData', this.props.formData);
    console.log('componentDidMount: yamlStr', this.props.yamlStr);
    console.log('componentDidMount: formId', this.props.formId);
  }

  toYaml({formData}) {
    console.log({formData});

    /*var x = {};
    for (let group in formData) {
      for (let k in formData[group]) {
        var splits = k.split('.'); //e.g., exporter.ports.containerPorts
        var q = formData[group][k];
        if (q) { //sometimes it is 'undefined' leading to exceptions in safeDump
          var p = x;
          for (let t of splits.slice(0, -1)) {
            if (!(t in p)) {
              p[t] = {};
            }
            p = p[t];
          }
          p[splits.slice(-1)] = q;
        }
      }
    }
    if (formData.exporterSettings && !formData.exporterSettings['exporter.required']) {
      delete x.exporter;
    }*/
      var x = JSON.parse(JSON.stringify(formData));
      if (x["spec"] && x["spec"]["backend"] && Object.entries(x["spec"]["backend"]).length === 0) {
          delete x["spec"]["backend"];
      }
      if (x["metadata"] && x["metadata"]["annotations"]) {
          x["metadata"]["annotations"] = {};
      }

      if (formData["metadata"] && formData["metadata"]["annotations"]) {
          formData["metadata"]["annotations"].forEach(function (item, index, array) {
            var value = Number(item["value"]);
            if (isNaN(value)) {
                value = item["value"];
            }
            x["metadata"]["annotations"][item["annotation"]] = value;
          })
      }
      var yamlStr = yaml.safeDump(x, { sortKeys: true, skipInvalid: true });
      console.log(yamlStr);
      this.setState({ formData: { ...formData }, yamlStr: yamlStr });
      this.props.setParentState(this.props.formId, { ...formData }, yamlStr);
  }

  render() {
    return (
      <>
        <Grid.Column width={7}>
            <Form
                  schema={this.props.schema}
                  noHtml5Validate
                  formData={this.state.formData}
                  liveValidate={true}
                  showErrorList={false}
                  uiSchema={this.props.uischema}
                  onChange={this.toYaml}
                  onSubmit={this.toYaml}
                  onError={log('errors')}
            >
            <Button inverted primary type="submit" >Generate values.yaml</Button>
            </Form>
        </Grid.Column>
          <Grid.Column width={9}>
            <Header dividing as={'h5'} inverted style={{marginTop: 0}}>Values.yaml</Header>
            <SyntaxHighlighter language="yaml" style={a11yDark}>
              {this.state.yamlStr}
            </SyntaxHighlighter>
          </Grid.Column>
        </>
    );
  }
}

export default HelmForm;
