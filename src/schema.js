export default class Schema {
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
Schema.prototype.deepClone = function (source, uniqueList) {
  const isObject = obj => typeof obj === 'object' && obj != null
  const find = (arr, item) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].source === item) {
        return arr[i]
      }
    }

    return null
  }
  if (!isObject(source)) return source

  if (!uniqueList) uniqueList = [] //   初始化数据

  const target = Array.isArray(source) ? [] : {}

  const uniqueData = find(uniqueList, source)
  if (uniqueData) return uniqueData.target

  uniqueList.push({
    source,
    target,
  })

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = this.deepClone(source[key], uniqueList) //   传入数组
      } else {
        target[key] = source[key]
      }
    }
  }

  return target
}
Schema.prototype.removeFather = schema => {
  function r(schema) {
    if (schema.children) {
      schema.children.map(child => {
        child.father = null
        if (child.options) child.options = [{ value: '1' }]
        if (child.children) r(child)
      })
    }
  }
  r(schema)
}
Schema.prototype.getObj = function (schema) {
  const self = this
  const target = schema.type === undefined ? {} : schema.type === 'arr' ? [] : {}
  if (schema.key === undefined) {
    if (schema.children) {
      for (const i in schema.children) {
        target[schema.children[i].key] = self.getObj(schema.children[i])
      }
    }
  } else if (schema.children) {
    for (const i in schema.children) {
      if (schema.children[i].children === undefined) {
        target[schema.children[i].key] = schema.children[i].value
      } else {
        target[schema.children[i].key] = self.getObj(schema.children[i])
      }
    }
  }

  return target
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
          value: child.mode === 'multiple' ? 'politics' : '',
          options: child.options,
          box: child.box,
          radios: child.radios,
          label: child.label,
          mode: child.mode,
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
