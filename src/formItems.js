import React from 'react'
import {
  Button, Form, Input, Select, Radio, DatePicker, Upload, Icon, Checkbox, InputNumber,
} from 'antd'
import UploadImage from '@/common/component/uploadImage'

const { Option } = Select
const { TextArea, Search } = Input
const { RangePicker } = DatePicker
const RadioGroup = Radio.Group

class FormItems extends React.PureComponent {
  getUploadFileUrl = (info, key, cb) => {
    let fileList = info.fileList.slice(-2)
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.data
      }

      return file
    })
    fileList = fileList.filter(file => {
      if (file.response) {
        this.props.form.setFieldsValue({ [key]: file.response.data })
        if (cb) cb()

        return file
      }

      return false
    })
  };

  getItem = item => {
    switch (item.type) {
      case 'upload':
        return (
          <Upload
            name={item.name || 'file'}
            action={item.actionPath}
            headers={{ authorization: 'authorization-text' }}
            onChange={info => this.getUploadFileUrl(info, item.key, item.onChange)}
            accept={item.accept}
            disabled={item.disabled}
            onRemove={item.onRemove}
          >
            <Button>
              <Icon type="upload" />
              {item.text || 'Select File'}
            </Button>
          </Upload>
        )

      case 'uploadImg':
        return (
          <UploadImage
            actionPath={item.actionPath}
            saveImgUrl={info => this.getUploadFileUrl(info, item.key, item.onChange)}
            isDeleteFile={item.isDeleteFile}
            name={item.name}
            onRemove={item.onRemove}
          />
        )

      case 'dateTime':
        return <DatePicker showTime style={{ width: '100%' }} disabledDate={item.disabledDate} disabledTime={item.disabledTime} />

      case 'dateRange':
        return (
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            placeholder={item.placeholder || ['Start Time', 'End Time']}
            onChange={item.onChange}
            onOk={item.onOk}
            allowClear={item.allowClear}
          />
        )

      case 'radio':
        return (
          <RadioGroup disabled={item.disabled}>
            {item.radio.map(radio => (
              <Radio value={radio.value} key={radio.value}>
                {radio.text}
              </Radio>
            ))}
          </RadioGroup>
        )

      case 'select':
        return (
          <Select
            placeholder={item.placeholder}
            disabled={item.disabled}
            onChange={item.onChange}
            showSearch={item.showSearch}
            optionFilterProp={item.optionFilterProp}
            filterOption={item.filterOption}
            allowClear={item.allowClear}
            mode={item.mode}
            maxTagCount={item.maxTagCount}
            className={item.className}
          >
            {item.options.map(option => {
              if (!option.text) option.text = option.value

              return (
                <Option value={option.value} key={option.value}>
                  {option.text}
                </Option>
              )
            })}
          </Select>
        )

      case 'textArea':
        return <TextArea autosize={{ minRows: item.size }} maxLength={item.maxLength} disabled={item.disabled} onBlur={item.onBlur} />

      case 'number':
        return <InputNumber min={item.min} max={item.max} step={item.step} onChange={item.onChange} placeholder={item.placeholder} className={item.className} />

      case 'btn':
        return (
          <Button type={item.btnType || 'primary'} loading={item.loading} onClick={item.onClick} disabled={item.disabled}>
            {item.text}
          </Button>
        )

      case 'search':
        return <Search placeholder={item.placeholder} enterButton={item.enterButtonText} size={item.size || 'large'} onSearch={item.onSearch} />

      case 'check':
        return (
          <Checkbox.Group>
            {item.box.map((box, i) => (
              <Checkbox value={box.value} key={i}>
                {box.text}
              </Checkbox>
            ))}
          </Checkbox.Group>
        )
      case 'component':
        return item.component
      default:
        return <Input placeholder={item.placeholder} maxLength={item.maxLength} type={item.inputType} disabled={item.disabled} onBlur={item.onBlur} />
    }
  };

  getForm = formItems => {
    if (this.props.form) {
      const { getFieldDecorator } = this.props.form

      return formItems.map((item, i) => {
        let {
          label, key, required, extra, initialValue, rules = [], slot, isShowSlot, toggler = true,
        } = item
        if (required) rules = [...rules, { required: true, message: `please add the ${label || 'value'}.` }]

        return (
          <span className="item-wrapper" key={i}>
            {toggler ? (
              <Form.Item label={label} key={i} extra={extra} className={item.className}>
                {isShowSlot ? slot : null}
                {key ? getFieldDecorator(key, { initialValue, rules })(this.getItem(item)) : this.getItem(item)}
              </Form.Item>
            ) : null}
          </span>
        )
      })
    }
  };

  componentDidMount() {
    const { needInit, data, form } = this.props
    if (needInit) Object.keys(data).forEach(key => setTimeout(() => form.setFieldsValue({ [key]: data[key] }), 0))
  }

  render() {
    return <div className="form-wrapper">{this.getForm(this.props.formItems)}</div>
  }
}
export default FormItems
