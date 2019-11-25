import React from 'react'
import Schema from './schema'

export default class FormModel {
  constructor(opt) {
    this.propertyName = opt.propertyName || 'Property Name'
    this.schemaInst = new Schema(opt.schema)
    this.formModel = []
    this.generateFormModel()
  }
}
FormModel.prototype.getPropertySuffix = function (item) {
  let s = ''
  function r(item) {
    if (item.father !== undefined) {
      if (item.father.key !== undefined) {
        s += `${item.key}-`
        if (item.father.father !== undefined) r(item.father)
      } else {
        s += `${item.key}`
      }
    }
  }
  r(item)

  return s
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
            label: self.propertyName,
            key: `prop_${self.getPropertySuffix(item)}`,
            required: true,
            initialValue: item.value,
            onBlur: e => {
              item.value = e.target.value
              self.schemaInst.origin = self.schemaInst.getObj(self.schemaInst.schema)
            },
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
        if (['str', 'number', 'select'].includes(item.type)) {
          self.formModel.push({
            type: item.type,
            label: item.label,
            options: item.options,
            key: `${item.father.father.father.key === undefined ? '' : item.father.father.father.key}[${item.father.father.key === undefined ? '' : item.father.father.key}][${
              item.father.key === undefined ? '' : item.father.key
            }][${item.key}]`,
            required: true,
            initialValue: item.value,
            showSearch: item.showSearch || true,
            optionFilterProp: item.optionFilterProp || 'children',
            mode: item.mode,
            filterOption: (input, option) => option.props.children && option.props.children.toLowerCase().indexOf(input.toLowerCase()) === 0,
            allowClear: item.allowClear || true,
            onChange: val => {
              item.value = val
              self.schemaInst.origin = self.schemaInst.getObj(self.schemaInst.schema)
            },
            onBlur: e => {
              item.value = e.target.value
              self.schemaInst.origin = self.schemaInst.getObj(self.schemaInst.schema)
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
