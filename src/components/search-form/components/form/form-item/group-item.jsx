import React, { memo, useState, useEffect } from 'react';
import { Select } from 'antd';
import RenderFromItem from '../renderFormItem';
import { prefixCls } from '../../../utils';

const { Option } = Select;

const GroupItem = memo(({ group, searchValue, onFormItemChange }) => {
  const [dataIndex, setDataIndex] = useState('');
  const [formItems, setFormItems] = useState([]);

  useEffect(() => {
    const filterItems = group.filter((item) => !item.hidden);
    setDataIndex(filterItems[0] ? filterItems[0].dataIndex : '');
    setFormItems(filterItems);
  }, [group]);
  const formItem = formItems.find((i) => i.dataIndex === dataIndex) || {};

  return (
    <div
      className={`${prefixCls}-group-item`}
    >
      <Select
        value={dataIndex}
        style={{ width: 100 }}
        onChange={(val) => setDataIndex(val)}
      >
        {
          group.map((op) => (
            <Option key={op.dataIndex} value={op.dataIndex}>{op.title}</Option>
          ))
        }
      </Select>
      <div className={`${prefixCls}-group-item-right`}>
        <RenderFromItem
          formItem={formItem}
          searchValue={searchValue}
          onFormItemChange={onFormItemChange}
        />
      </div>
    </div>
  );
});

export default GroupItem;
