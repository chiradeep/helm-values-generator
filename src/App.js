import React from 'react';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import './App.css';
import Form from "@rjsf/core"


const schema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    done: {type: "boolean", title: " Done?", default: false}
  }
};

const uischema = {
	"title": {
           "ui:widget": "textarea"
	}
}

const log = (type) => console.log.bind(console, type);

class App extends React.Component {
	render() {
	  return (
		  <div class="col-sm-8">
		  <div class="row">
		  <div class="col-sm-6">
                     <Form schema={schema}
		           uiSchema={uischema}
                           onChange={log("changed")}
                           onSubmit={log("submitted")}
                           onError={log("errors")} />
		  </div>
		  </div>
		  </div>
	  );
	}
}

export default App;
