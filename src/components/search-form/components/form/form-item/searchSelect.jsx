import React, { memo } from 'react';
import AutoCompleteSelect from '@/public/common/autoCompleteSelect/autoCompleteSelect';

const Index = memo(({ formItem, value, onFormItemChange }) => (
  <AutoCompleteSelect
    style={{ width: '100%' }}
    placeholder={formItem.placeholder ? formItem.placeholder : `请选择${formItem.title}`}
    maxTagCount={1}
    field={formItem.field}
    value={value}
    mode={formItem.multiple ? 'multiple' : ''}
    onChange={(val, node) => {
        let ops = {};
        if (formItem.multiple) {
          node.forEach((n) => {
            ops[n.props.value] = n.props.title;
          });
        } else {
          ops = node ? { [node.props.value]: node.props.title } : {};
        }
        onFormItemChange({ [formItem.dataIndex]: val }, formItem, ops);
      }}
  />
));

export default Index;
