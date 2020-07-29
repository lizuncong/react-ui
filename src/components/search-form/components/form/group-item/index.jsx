import React, { memo, useState, useEffect } from 'react';
import { Select } from 'antd';
import RenderFromItem from '../renderFormItem';

import styles from '../../../index.scss';

const { Option } = Select;

const Index = memo(({ group, searchValue, onFormItemChange }) => {
  const [dataIndex, setDataIndex] = useState('');
  const [formItems, setFormItems] = useState([]);

  useEffect(() => {
    const filterItems = group.filter(item => !item.hidden);
    setDataIndex(filterItems[0] ? filterItems[0].dataIndex : '');
    setFormItems(filterItems);
  }, [group]);
  const formItem = formItems.find(i => i.dataIndex === dataIndex) || {};
  return (
    <div
      className={styles.groupItem}
    >
      <Select
        value={dataIndex}
        style={{ width: 100 }}
        onChange={val => setDataIndex(val)}
      >
        {
          group.map(op => (
            <Option key={op.dataIndex} value={op.dataIndex}>{op.title}</Option>
          ))
        }
      </Select>
      <div className={styles.groupItemRight}>
        <RenderFromItem
          formItem={formItem}
          searchValue={searchValue}
          onFormItemChange={onFormItemChange}
        />
      </div>
    </div>
  );
});

export default Index;
