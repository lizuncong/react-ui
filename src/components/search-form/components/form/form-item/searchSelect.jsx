import React, { memo, useState } from 'react';
import { Select, Spin } from 'antd';

const getList = (text) => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      code: 0,
      info: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => ({
        label: `mock data-${item}-${text}`,
        value: item + text,
      })),
    });
  }, 1000);
});
const { Option } = Select;

const Index = memo(({ formItem, value, onFormItemChange }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async (text) => {
    setLoading(true);
    const result = await getList(text || '');
    setLoading(false);
    if (result) {
      setData(result.info);
    }
  };
  const optionsList = Object.values(selectedOptions)
    .concat(data);
  return (
    <Select
      allowClear={!formItem.disabledClear}
      showSearch
      onSearch={(text) => {
        getData(text);
      }}
      onDropdownVisibleChange={(open) => (open ? getData() : '')}
      notFoundContent={loading ? <Spin size="small" /> : '无'}
      style={{ width: '100%' }}
      placeholder={formItem.placeholder ? formItem.placeholder : `请选择${formItem.title}`}
      maxTagCount={1}
      value={value}
      mode={formItem.multiple ? 'multiple' : ''}
      onChange={(val, node) => {
        const selectedOps = {};
        let ops = {};
        if (formItem.multiple) {
          node.forEach((n) => {
            ops[n.props.value] = n.props.title;
            selectedOps[n.props.value] = { label: n.props.title, value: n.props.value };
          });
        } else if (node) {
          ops = { [node.props.value]: node.props.title };
          selectedOps[node.props.value] = { label: node.props.title, value: node.props.value };
        }
        setSelectedOptions({ ...selectedOptions, ...selectedOps });
        onFormItemChange({ [formItem.dataIndex]: val }, formItem, ops);
      }}
    >
      {
        optionsList
          .filter((item, index) => optionsList.findIndex((i) => i.value === item.value) === index)
          .map((d) => <Option value={d.value} title={d.label} key={d.value}>{d.label}</Option>)
      }
    </Select>
  );
});

export default Index;
