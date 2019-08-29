import React from 'react'
import { Form, Button } from 'antd'
import FormItems from './formItems'
import FormModel from './formModel'
import './index.css'

export default class JSONEdit {
  constructor(schema) {
    this.FormModelInst = new FormModel(schema);
    this.fieldsValue = {};
  }
}
JSONEdit.prototype.init = function(){
  const self = this;
  function Editor(props) {
    const { useState, useEffect } = React;
    const [formItems, setFormItems] = useState(self.FormModelInst.formModel);
    useEffect(() => {
      setFormItems([...self.FormModelInst.formModel]);
    });
    const getValues = () => {
      const fields = props.form.getFieldsValue();
      const prop = Object.keys(fields).filter(item => item.startsWith('prop'));
      if (prop.length) {
        self.fieldsValue = {};
        prop.map(item => self.fieldsValue[fields[item]] = self.FormModelInst.schemaInst.origin[item.split('_')[1]]);
      } else self.fieldsValue = fields;
      window.DEBUGGER && console.log(self.fieldsValue);
    };
    return <div className="json-editor-wrapper"> 
      <Form className="form">
        <FormItems formItems={formItems} form={props.form}/>
        <Button onClick={getValues}>Save</Button>
      </Form>
      <pre>
        <code>{JSON.stringify(self.fieldsValue, null, 2)}</code>
      </pre>
    </div>;
  }
  const WrappedEditor = Form.create({ name: 'Editor' })(Editor);
  return WrappedEditor;
};

