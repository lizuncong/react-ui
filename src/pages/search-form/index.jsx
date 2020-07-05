import React, { useState } from 'react';
import SearchForm from 'components/search-form';
import styles from './index.module.less';

const Index = () => {
  const [searchCondition, setSearchCondition] = useState({});
  const formItems = [
    {
      title: '条件1',
      dataIndex: 'test1',
      type: 'input',
    },
    {
      title: '条件2',
      dataIndex: 'test2',
      type: 'select',
      mode: 'multiple',
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
        {
          label: '选项3',
          value: '3',
        },
      ],
    },
    {
      title: '产品分类',
      dataIndex: 'productCategory',
      type: 'select',
      options: [
        {
          label: '分类1',
          value: '1',
        },
        {
          label: '分类2',
          value: '2',
        },
        {
          label: '分类3',
          value: '3',
        },
      ],
    },
    {
      title: '条件6',
      startIndex: 'test6Start',
      endIndex: 'test6End',
      type: 'dateRange',
      ranges: 30,
    },
    {
      title: '条件7',
      startIndex: 'test7Start',
      endIndex: 'test7End',
      type: 'dateRange',
    },
    {
      title: '输入范围',
      startIndex: 'dayRangeStart',
      endIndex: 'dayRangeEnd',
      type: 'inputRange',
    },
  ];
  const otherItems = [
    {
      title: '其他1',
      type: 'checkBox',
      dataIndex: 'other1',
    },
    {
      title: '其他2',
      type: 'checkBox',
      checkValue: 0,
      dataIndex: 'other2',
    },
    {
      title: '其他3',
      type: 'checkBox',
      checkValue: '1',
      dataIndex: 'other3',
    },
    {
      title: '其他4',
      type: 'checkBox',
      checkValue: '0',
      dataIndex: 'other4',
    },
    {
      title: '其他5',
      type: 'checkBox',
      checkValue: '1',
      dataIndex: 'other5',
    },
    {
      title: '其他6',
      type: 'sort',
      dataIndex: 'other6',
    },
    {
      title: '其他7',
      type: 'sort',
      dataIndex: 'other7',
      sortValues: ['1', '2'],
    },
  ];
  return (
    <div className={styles.container}>
      <SearchForm
        formItems={formItems}
        otherItems={otherItems}
        value={searchCondition}
        onValueChange={(value) => {
          console.log('onValuechange...', value);
          setSearchCondition(value);
        }}
      />
    </div>
  );
};

export default Index;
