"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var React=_interopDefault(require("react")),antd=require("antd");function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function ownKeys(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function _objectSpread2(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(r,!0).forEach(function(t){_defineProperty(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _possibleConstructorReturn(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_nonIterableRest()}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _iterableToArrayLimit(e,t){var r=[],n=!0,a=!1,o=void 0;try{for(var i,c=e[Symbol.iterator]();!(n=(i=c.next()).done)&&(r.push(i.value),!t||r.length!==t);n=!0);}catch(e){a=!0,o=e}finally{try{n||null==c.return||c.return()}finally{if(a)throw o}}return r}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}var Option=antd.Select.Option,TextArea=antd.Input.TextArea,Search=antd.Input.Search,RangePicker=antd.DatePicker.RangePicker,RadioGroup=antd.Radio.Group,FormItems=function(e){function t(){var e,r;_classCallCheck(this,t);for(var n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return _defineProperty(_assertThisInitialized(r=_possibleConstructorReturn(this,(e=_getPrototypeOf(t)).call.apply(e,[this].concat(a)))),"getItem",function(e){switch(e.type){case"dateTime":return React.createElement(antd.DatePicker,{showTime:!0,style:{width:"100%"},disabledDate:e.disabledDate,disabledTime:e.disabledTime});case"dateRange":return React.createElement(RangePicker,{showTime:{format:"HH:mm"},format:"YYYY-MM-DD HH:mm",placeholder:e.placeholder||["Start Time","End Time"],onChange:e.onChange,onOk:e.onOk,allowClear:e.allowClear});case"radio":return React.createElement(RadioGroup,{disabled:e.disabled},e.radio.map(function(e){return React.createElement(antd.Radio,{value:e.value,key:e.value},e.text)}));case"select":return React.createElement(antd.Select,{disabled:e.disabled,onChange:e.onChange,showSearch:e.showSearch,optionFilterProp:e.optionFilterProp,filterOption:e.filterOption,allowClear:e.allowClear},e.options.map(function(e){return e.text||(e.text=e.value),React.createElement(Option,{value:e.value,key:e.value},e.text)}));case"textArea":return React.createElement(TextArea,{autosize:{minRows:e.size},maxLength:e.maxLength,disabled:e.disabled,onBlur:e.onBlur});case"number":return React.createElement(antd.InputNumber,{min:e.min,max:e.max,step:e.step,onChange:e.onChange});case"btn":return React.createElement(antd.Button,{type:e.btnType||"primary",loading:e.loading,onClick:e.onClick,disabled:e.disabled},e.text);case"search":return React.createElement(Search,{placeholder:e.placeholder,enterButton:e.enterButtonText,size:e.size||"large",onSearch:e.onSearch});case"check":return React.createElement(antd.Checkbox.Group,null,e.box.map(function(e,t){return React.createElement(antd.Checkbox,{value:e.value,key:t},e.text)}));case"component":return e.component;default:return React.createElement(antd.Input,{placeholder:e.placeholder,maxLength:e.maxLength,type:e.inputType,disabled:e.disabled,onBlur:e.onBlur})}}),_defineProperty(_assertThisInitialized(r),"getForm",function(e){if(r.props.form){var t=r.props.form.getFieldDecorator;return e.map(function(e,n){var a=e.label,o=e.key,i=e.required,c=e.extra,l=e.initialValue,u=e.rules,s=void 0===u?[]:u,p=e.slot,f=e.isShowSlot,d=e.toggler,h=void 0===d||d;return i&&(s=[].concat(_toConsumableArray(s),[{required:!0,message:"please add the ".concat(a,".")}])),React.createElement("span",{className:"item-wrapper",key:n},h?React.createElement(antd.Form.Item,{label:a,key:n,extra:c,className:e.className},f?p:null,o?t(o,{initialValue:l,rules:s})(r.getItem(e)):r.getItem(e)):null)})}}),r}return _inherits(t,React.PureComponent),_createClass(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.needInit,r=e.data,n=e.form;t&&Object.keys(r).forEach(function(e){return setTimeout(function(){return n.setFieldsValue(_defineProperty({},e,r[e]))},0)})}},{key:"render",value:function(){return React.createElement("div",{className:"form-wrapper"},this.getForm(this.props.formItems))}}]),t}(),JSONEdit=function e(t){_classCallCheck(this,e),this.FormModelInst=new FormModel(t)};JSONEdit.prototype.init=function(){var e=this;return antd.Form.create({name:"Editor"})(function(t){var r=React.useState,n=React.useEffect,a=_slicedToArray(r(e.FormModelInst.formModel),2),o=a[0],i=a[1];return n(function(){i(_toConsumableArray(e.FormModelInst.formModel))}),React.createElement("div",{className:"json-editor-wrapper"},React.createElement(antd.Form,{className:"form"},React.createElement(FormItems,{formItems:o,form:t.form}),React.createElement(antd.Button,{onClick:function(){console.log(e.FormModelInst.origin)}},"Save")))})};var Schema=function e(t){_classCallCheck(this,e),this.schema=t,this.appendFather(t),this.origin=this.getObj(t)};Schema.prototype.appendFather=function(e){!function e(t){t.children&&t.children.map(function(r){r.father=t,r.children&&e(r)})}(e)},Schema.prototype.getObj=function(e){var t={obj:{},arr:[],str:"",num:0,bool:!1},r={};return function e(n){if(n.children){var a=t[n.type];n.father&&((n.father.type?t[n.father.type]:{})[n.key]=a),n.children.map(function(t){t.children?e(t):a[t.key]||(a[t.key]=t.value)}),console.log(3444,a),function e(n,a){if(n.father){var o=n.father.type?t[n.father.type]:{};o[n.key]=a,n.father.type?e(n.father,o):r=o}}(n,a)}}(e),r},Schema.prototype.handleChildren=function(e){!function e(t){if(t.children){var r=_toConsumableArray(t.children);delete t.children;var n=[];r.map(function(e){n.push({type:e.type,key:e.key,value:"",label:e.label,father:t,children:e.children,repeatable:e.repeatable,removable:e.removable})}),n.map(function(t){t.children&&e(t)}),t.children=n}}(e)},Schema.prototype.add=function(e){var t=_objectSpread2({},e);e.curKey||(e.curKey=e.key),e.curKey++,t.key=e.curKey,t.removable=!0,delete t.repeatable,t.curKey&&delete t.curKey,this.handleChildren(t),e.father.children.push(t),this.origin=this.getObj(this.schema)},Schema.prototype.remove=function(e){var t=_objectSpread2({},e);t.father.children=t.father.children.filter(function(e){return e.key!==t.key}),this.origin=this.getObj(this.schema)};var FormModel=function e(t){_classCallCheck(this,e),this.schemaInst=new Schema(t),this.formModel=[],this.origin={},this.generateFormModel()};FormModel.prototype.generateFormModel=function(){var e=this;e.formModel=[],function t(r){r.children&&r.children.map(function(r){r.repeatable&&e.formModel.push({type:"btn",text:"+ Add",onClick:function(){return e.add(r)}}),r.removable&&e.formModel.push({type:"btn",text:"- Remove",onClick:function(){return e.remove(r)}}),"*"===r.keyName?e.formModel.push({label:"Property Name",onBlur:function(t){return e.origin[t.target.value]=e.schemaInst.origin[r.key]}}):("arr"===r.type||"obj"===r.type&&"number"!=typeof r.key)&&e.formModel.push({type:"component",component:React.createElement("div",{style:{background:"#021e38",paddingLeft:"10px",borderRadius:"2px",color:"#fff",fontStyle:"italic"}},r.key)}),"str"===r.type&&e.formModel.push({label:r.label,key:"".concat(r.father.father?r.father.father.key:"","[").concat(r.father?r.father.key:"","][").concat(r.key,"]"),onBlur:function(t){r.value=t.target.value,e.schemaInst.origin["".concat(r.father.father?r.father.father.key:"")]["".concat(r.father?r.father.key:"")]["".concat(r.key)]=t.target.value}}),r.children&&t(r)})}(e.schemaInst.schema)},FormModel.prototype.add=function(e){this.schemaInst.add(e),this.generateFormModel()},FormModel.prototype.remove=function(e){this.schemaInst.remove(e),this.generateFormModel()},module.exports=JSONEdit;
