import React, { memo } from 'react';
import { Select } from 'antd';

const { Option } = Select;

/* 普通的选择器
* options需从外部传过来
* */
const Index = memo(({ formItem, value, onFormItemChange }) => (
  <Select
    allowClear={!formItem.disabledClear}
    style={{ width: '100%' }}
    value={value}
    placeholder={formItem.placeholder ? formItem.placeholder : `请选择${formItem.title}`}
    onChange={(val, node) => {
      let ops = {};
      if (formItem.multiple) {
        node.forEach((n) => {
          ops[n.props.value] = n.props.children;
        });
      } else {
        ops = node ? { [node.props.value]: node.props.children } : {};
      }
      onFormItemChange({ [formItem.dataIndex]: val }, formItem, ops);
    }}
    mode={formItem.multiple ? 'multiple' : ''}
    maxTagCount={1}
    showSearch
    filterOption={(text, option) => option.props.children.indexOf(text) >= 0}
  >
    {
        formItem.options && formItem.options.map((item) => (
          <Option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </Option>
        ))
      }
  </Select>
));

export default Index;
