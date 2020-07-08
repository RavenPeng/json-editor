import React from 'react'
import { Form, Button } from 'antd'
import FormItems from './formItems'
import FormModel from './formModel'
import './index.css'

export default class JSONEdit {
  constructor(opt) {
    this.FormModelInst = new FormModel(opt)
    this.isShowPreview = opt.isShowPreview
    this.generateCallback = opt.generateCallback
    this.schema = opt.schema
    this.newSchema = {}
  }
  removeFather() {
    this.newSchema = this.FormModelInst.schemaInst.deepClone(this.schema)
    this.FormModelInst.schemaInst.removeFather(this.newSchema)

    return this.newSchema
  }
  init() {
  let Editor = (props) => {
    const { useState, useEffect } = React
    const [fieldsValue, setFieldsValue] = useState({})
    useEffect(() => {
      if (Object.keys(fieldsValue).length) this.generateCallback(fieldsValue)
    }, [fieldsValue])
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
        if (!err) {
          const prop = Object.keys(fields)
            .filter(item => item.startsWith('prop'))
            .reverse()
          if (prop.length) {
            setFieldsValue(setProps(prop, fields))
          } else setFieldsValue(fields)
        }
      })
    }
    const hack = () => {
      props.form.validateFieldsAndScroll((err, fields) => {})
    }

    return (
  <div className="json-editor-wrapper" onClick={hack}>
    <Form className="form">
          <FormItems formItems={self.FormModelInst.formModel} form={props.form} />
          <Button onClick={getValues} type="primary">
            Generate JSON
          </Button>
        </Form>
    {self.isShowPreview ? (
          <pre>
            <code>{JSON.stringify(fieldsValue, null, 2).replace('null,', '')}</code>
          </pre>
        ) : null}
  </div>
    )
  }
  const WrappedEditor = Form.create({ name: 'Editor' })(Editor)

  return WrappedEditor
}

