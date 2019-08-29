import Schema from './schema'

export default class FormModel {
  constructor(schema) {
    this.schemaInst = new Schema(schema);
    this.formModel = [];
    this.generateFormModel();
  }
}
FormModel.prototype.generateFormModel = function() {
  const self = this;
  self.formModel = [];
  function r(scm) {
    if (scm.children) {
      scm.children.map(item => {
        if (item.repeatable) {
          self.formModel.push({
            type: 'btn',
            text: '+ Add',
            onClick: () => self.add(item)
          });
        }
        if (item.removable) {
          self.formModel.push({
            type: 'btn',
            text: '- Remove',
            onClick: () => self.remove(item)
          });
        } 
        if(item.keyName === '*') {
          self.formModel.push({
            label: 'Property Name',
            key: `prop_${item.key}`,
          });
        } else {
          if (item.type === 'arr' || (item.type === 'obj' && typeof item.key !== 'number')) {
            self.formModel.push({
              type: 'component',
              component: <div style={{ background: '#021e38', paddingLeft: '10px', borderRadius: '2px', color: '#fff', fontStyle: 'italic' }}>{item.key}</div>
            });
          }
        }
        if(item.type === 'str') {
          self.formModel.push({
            label: item.label,
            key: `${item.father.father ? item.father.father.key : ''}[${item.father ? item.father.key : ''}][${item.key}]`,
            onBlur: e => {
              item.value = e.target.value;
              self.schemaInst.origin[`${item.father.father ? item.father.father.key : ''}`][`${item.father ? item.father.key : ''}`][`${item.key}`] = e.target.value;
            }
          });
        } 
        if (item.children) r(item);
      });
    }
  }
  r(self.schemaInst.schema);
};
FormModel.prototype.add = function(item) {
  const self = this;
  self.schemaInst.add(item);
  self.generateFormModel();
};
FormModel.prototype.remove = function(item) {
  const self = this;
  self.schemaInst.remove(item);
  self.generateFormModel();
};