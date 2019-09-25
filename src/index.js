import React from 'react'
import { Form, Button } from 'antd'
import FormItems from './formItems'
import FormModel from './formModel'
import './index.css'

export default class JSONEdit {
  constructor(schema) {
    this.FormModelInst = new FormModel(schema)
  }
}
JSONEdit.prototype.init = function () {
  const self = this
  function Editor(props) {
    const { useState, useEffect } = React
    const [formItems, setFormItems] = useState(self.FormModelInst.formModel)
    const [fieldsValue, setFieldsValue] = useState({})
    useEffect(() => setFormItems([...self.FormModelInst.formModel])); // eslint-disable-line

    const setProps = (prop, fields) => {
      setFieldsValue({})
      const f = JSON.parse(JSON.stringify(fields))
      prop.map(item => {
        const paths = item
          .split('_')[1]
          .split('-')
          .reverse()
        const first = paths.splice(0, 1)[0]
        const last = paths.splice(-1, 1)[0]
        const rest = paths.join('][')
        if (!rest) {
          if (last !== undefined) {
            f[first][fields[item]] = f[first][last]
            delete f[first][last]
          } else {
            f[fields[item]] = f[first]
            delete f[first]
          }
        } else {
          try {
            f[first][rest][fields[item]] = f[first][rest][last]
            delete f[first][rest][last]
          } catch (e) {
            console.log({ e })
          }
        }
      })
      prop.map(item => delete f[item])

      return f
    }
    const getValues = () => {
      const { validateFieldsAndScroll } = props.form
      validateFieldsAndScroll((err, fields) => {
        if (err) return
        const prop = Object.keys(fields)
          .filter(item => item.startsWith('prop'))
          .reverse()
        if (prop.length) {
          setFieldsValue(setProps(prop, fields))
        } else setFieldsValue(fields)
        window.DEBUGGER && console.log(fieldsValue)
      })
    }

    return (
      <div className="json-editor-wrapper">
        <Form className="form">
          <FormItems formItems={formItems} form={props.form} />
          <Button onClick={getValues}>Save</Button>
        </Form>
        <pre>
          <code>{JSON.stringify(fieldsValue, null, 2).replace('null,', '')}</code>
        </pre>
      </div>
    )
  }
  const WrappedEditor = Form.create({ name: 'Editor' })(Editor)

  return WrappedEditor
}
