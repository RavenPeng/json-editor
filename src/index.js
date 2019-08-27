// 编辑器对象，保存由表单模型生成表单视图组件、表单元素的添加和删除、表单值的获取、验证和修改等方法
import React from 'react'
import { Form, Button } from 'antd'
import FormItems from './formItems'

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
    useEffect(() => {
      setFormItems([...self.FormModelInst.formModel])
    })
    const getValues = () => {
      // const fields = props.form.getFieldsValue();
      // Object.keys(fields).map(key => {
      //   self.FormModelInst.origin[key] = fields[key];
      // });
      console.log(self.FormModelInst.origin)
    }

    return (
      <div className="json-editor-wrapper">
        <Form className="form">
          <FormItems formItems={formItems} form={props.form} />
          <Button onClick={getValues}>Save</Button>
        </Form>
      </div>
    )
  }
  const WrappedEditor = Form.create({ name: 'Editor' })(Editor)

  return WrappedEditor
}
// schema对象，保存schema的添加、删除及处理father和children的方法
class Schema {
  constructor(schema) {
    this.schema = schema
    this.appendFather(schema)
    this.origin = this.getObj(schema)
  }
}
Schema.prototype.appendFather = schema => {
  function r(schema) {
    if (schema.children) {
      schema.children.map(child => {
        child.father = schema
        if (child.children) r(child)
      })
    }
  }
  r(schema)
}
Schema.prototype.getObj = schema => {
  const typeMap = {
    obj: {},
    arr: [],
    str: '',
    num: 0,
    bool: false,
  }
  let res = {}
  function r(schema) {
    if (schema.children) {
      const obj = typeMap[schema.type]
      if (schema.father) {
        const newObj = schema.father.type ? typeMap[schema.father.type] : {}
        newObj[schema.key] = obj
      }
      schema.children.map(item => {
        if (!item.children) {
          if (!obj[item.key]) obj[item.key] = item.value
        } else r(item)
      })
      console.log(3444, obj)
      p(schema, obj)
    }
  }
  function p(raw, obj) {
    if (raw.father) {
      const newObj = raw.father.type ? typeMap[raw.father.type] : {}
      newObj[raw.key] = obj

      if (!raw.father.type) {
        res = newObj
      } else p(raw.father, newObj)
    }
  }
  r(schema)

  return res
}
Schema.prototype.handleChildren = item => {
  function r(item) {
    if (item.children) {
      const children = [...item.children]
      delete item.children
      const newChildren = []
      children.map(child => {
        newChildren.push({
          type: child.type,
          key: child.key,
          value: '',
          label: child.label,
          father: item,
          children: child.children,
          repeatable: child.repeatable,
          removable: child.removable,
        })
      })
      newChildren.map(child => {
        if (child.children) r(child)
      })
      item.children = newChildren
    }
  }
  r(item)
}
Schema.prototype.add = function (item) {
  const self = this
  const newItem = { ...item }
  if (!item.curKey) item.curKey = item.key
  item.curKey++
  newItem.key = item.curKey
  newItem.removable = true
  delete newItem.repeatable
  if (newItem.curKey) delete newItem.curKey
  self.handleChildren(newItem)
  item.father.children.push(newItem)
  self.origin = self.getObj(self.schema)
}
Schema.prototype.remove = function (item) {
  const self = this
  const newItem = { ...item }
  newItem.father.children = newItem.father.children.filter(child => child.key !== newItem.key)
  self.origin = self.getObj(self.schema)
}

// 表单模型对象，保存对表单模型的生成、添加和删除的方法
class FormModel {
  constructor(schema) {
    this.schemaInst = new Schema(schema)
    this.formModel = []
    this.origin = {}
    this.generateFormModel()
  }
}
FormModel.prototype.generateFormModel = function () {
  const self = this
  self.formModel = []
  function r(scm) {
    if (scm.children) {
      scm.children.map(item => {
        if (item.repeatable) {
          self.formModel.push({
            type: 'btn',
            text: '+ Add',
            onClick: () => self.add(item),
          })
        }
        if (item.removable) {
          self.formModel.push({
            type: 'btn',
            text: '- Remove',
            onClick: () => self.remove(item),
          })
        }
        if (item.keyName === '*') {
          self.formModel.push({
            label: 'Property Name',
            onBlur: e => self.origin[e.target.value] = self.schemaInst.origin[item.key],
          })
        } else if (item.type === 'arr' || (item.type === 'obj' && typeof item.key !== 'number')) {
          self.formModel.push({
            type: 'component',
            component: <div style={{
              background: '#021e38', paddingLeft: '10px', borderRadius: '2px', color: '#fff', fontStyle: 'italic',
            }}
            >
              {item.key}

            </div>,
          })
        }
        if (item.type === 'str') {
          self.formModel.push({
            label: item.label,
            key: `${item.father.father ? item.father.father.key : ''}[${item.father ? item.father.key : ''}][${item.key}]`,
            onBlur: e => {
              item.value = e.target.value
              self.schemaInst.origin[`${item.father.father ? item.father.father.key : ''}`][`${item.father ? item.father.key : ''}`][`${item.key}`] = e.target.value
            },
          })
        }
        if (item.children) r(item)
      })
    }
  }
  r(self.schemaInst.schema)
}
FormModel.prototype.add = function (item) {
  const self = this
  self.schemaInst.add(item)
  self.generateFormModel()
}
FormModel.prototype.remove = function (item) {
  const self = this
  self.schemaInst.remove(item)
  self.generateFormModel()
}
