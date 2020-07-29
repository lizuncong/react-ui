import React, { memo } from 'react';
import MultiLabel from './multiLabel';
import Label from './label';

const Index = memo(({
  formItem, selectedOptions, onDelete, searchValue,
}) => {
  let label = '';
  switch (formItem.type) {
    case 'select':
    case 'searchSelect':
    case 'slide':
      if (formItem.multiple) {
        const soptions = selectedOptions[formItem.dataIndex] || {};
        const labelItems = (searchValue[formItem.dataIndex] || []).map(val => ({
          label: soptions[val],
          value: val,
        }));
        label = (
          <MultiLabel
            disabledClear={formItem.disabledClear}
            key={formItem.dataIndex}
            title={formItem.title}
            items={labelItems}
            onClick={(newItems) => {
              onDelete(
                {
                  ...searchValue,
                  ...{ [formItem.dataIndex]: newItems.map(i => i.value) },
                },
                formItem,
              );
            }}
          />
        );
      } else {
        const op = selectedOptions[formItem.dataIndex] || {};
        label = (
          <Label
            disabledClear={formItem.disabledClear}
            key={formItem.dataIndex}
            title={formItem.title}
            label={op[searchValue[formItem.dataIndex]]}
            value={searchValue[formItem.dataIndex]}
            onClick={() => {
              delete searchValue[formItem.dataIndex];
              onDelete({ ...searchValue }, formItem);
            }}
          />
        );
      }
      break;
    default: {
      let lab = searchValue[formItem.dataIndex];
      let val = searchValue[formItem.dataIndex];
      if (formItem.type === 'datePicker') {
        const startIndex = `${formItem.dataIndex}Start`;
        const endIndex = `${formItem.dataIndex}End`;
        val = searchValue[startIndex];
        lab = [searchValue[startIndex], searchValue[endIndex]].join('~');
      }
      label = (
        <Label
          key={formItem.dataIndex}
          title={formItem.title}
          label={lab}
          disabledClear={formItem.disabledClear}
          value={val}
          onClick={() => {
            if (formItem.type === 'datePicker') {
              const startIndex = `${formItem.dataIndex}Start`;
              const endIndex = `${formItem.dataIndex}End`;
              delete searchValue[startIndex];
              delete searchValue[endIndex];
            } else {
              delete searchValue[formItem.dataIndex];
            }
            onDelete({ ...searchValue }, formItem);
          }}
        />
      );
    }
  }

  return label;
});

export default Index;
