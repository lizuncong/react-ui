import React, { memo } from 'react';
import { Input } from 'antd';

const Index = memo(({ value, formItem, onFormItemChange }) => {
  const { maxLength, inputType } = formItem;
  return (
    <Input
      onKeyDown={(e) => {
        // 回车键
        if (e.keyCode === 13) {
          onFormItemChange({}, {
            ...formItem,
            type: 'input-enterPress',
            autoSearch: true,
          });
        }
      }}
      onChange={(e) => {
        const d = e.target.value;
        if (maxLength && String(d).length > maxLength) return;
        if (inputType === 'int') {
          const replaceVal = d ? d.replace(/[^\d]/g, '') : '';
          const temp = replaceVal !== '' ? Number(replaceVal) : '';
          if (maxLength && String(temp).length > maxLength) return;
          onFormItemChange({ [formItem.dataIndex]: temp === '' ? undefined : temp }, formItem);
          return;
        }
        onFormItemChange({ [formItem.dataIndex]: d === '' ? undefined : d }, formItem);
      }}
      value={value}
      placeholder={formItem.placeholder ? formItem.placeholder : `请输入${formItem.title}`}
    />
  );
});

export default Index;
