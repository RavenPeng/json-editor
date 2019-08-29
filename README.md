# json-editor

A json editor based on react and antd.

# How to Use

0. `npm install @holiday_peng/json-editor`

1. create a schema like this:
`If you are not sure the key name, use '*' to be the placeholder, the editor will fill it after read the value.`
````
var schema = {
  children: [
    {
      keyName: '*',
      key: 0,
      type: 'arr',
      repeatable: true,
      children: [
        {
          key: 0,
          type: 'obj',
          repeatable: true,
          father: null,
          children: [
            {
              key: 'topicId',
              label: 'Topic Id',
              type: 'str',
              father: null,
              value: '',
            },
            {
              key: 'iconUrl',
              label: 'Icon Url',
              type: 'str',
              father: null,
              value: '',
            },
            {
              key: 'displayName',
              label: 'Display Name',
              type: 'str',
              father: null,
              value: '',
            },
          ],
        },
      ],
    },
  ],
};
````
2. because the editor was built based on react and antd, it has to be used in a react project like this: 
````
import React from 'react';
import Editor from '@holiday_peng/json-editor/dist';

class JSONEditor extends React.Component {
  render() {
    const EditorIns = new Editor(schema).init();
    return (
      <div className='editor-wrapper'>
        <EditorIns/>
      </div>
    );
  }
}
export default JSONEditor;
````