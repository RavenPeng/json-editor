import React from 'react';
export default class Schema {
  constructor(schema) {
    this.schema = schema;
    this.appendFather(schema);
    this.origin = this.getObj(schema);
  }
}
Schema.prototype.appendFather = schema => {
  function r(schema) {
    if (schema.children) {
      schema.children.map(child => {
        child.father = schema;
        if (child.children) r(child);
      });
    } 
  }
  r(schema);
};
Schema.prototype.getObj = function(schema) {
  const self = this;
  let target = schema.type === undefined ? {} : schema.type === 'arr' ? [] : {};
  if (schema.key === undefined) {
    if (schema.children) {
      for (let i in schema.children) {  
        target[schema.children[i].key] = self.getObj(schema.children[i]);
      }
    }
  } else {
    if (schema.children) {
      for (let i in schema.children) {  
        if (schema.children[i].children === undefined) {
          target[schema.children[i].key] = schema.children[i].value;
        } else {
          target[schema.children[i].key] = self.getObj(schema.children[i]);
        }
      }
    }
  }
  return target;
};
Schema.prototype.handleChildren = item => {
  function r(item) {
    if (item.children) {
      const children = [...item.children];
      delete item.children;
      let newChildren = [];
      children.map(child => {
        newChildren.push({
          type: child.type,
          key: child.key,
          value: '',
          label: child.label,
          father: item,
          children: child.children,
          repeatable: child.repeatable,
          removable: child.removable
        });
      });
      newChildren.map(child => {
        if (child.children) r(child);
      });
      item.children = newChildren;
    }
  }
  r(item);
};
Schema.prototype.add = function(item) {
  const self = this;
  let newItem = { ...item }; 
  item.curKey = item.key;
  item.curKey++;
  newItem.key = item.curKey;
  newItem.removable = true;
  delete newItem.repeatable;
  if (newItem.curKey) delete newItem.curKey;
  self.handleChildren(newItem);
  item.father.children.push(newItem);
  self.origin = self.getObj(self.schema);
  
};
Schema.prototype.remove = function(item) {
  const self = this;
  let newItem = { ...item };
  newItem.father.children = newItem.father.children.filter(child => child.key !==  newItem.key);
  self.origin = self.getObj(self.schema);
};