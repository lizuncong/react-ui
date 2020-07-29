import React, { memo, useCallback } from 'react';
import SelectItem from './form-item/select';
import SearchSelectItem from './form-item/searchSelect';
import RangePickerItem from './form-item/rangePicker';
import GroupItem from './group-item';
import InputItem from './form-item/input';
import SlideItem from '../slide';
import styles from '../../index.less';

export default memo(({ formItem, searchValue, onFormItemChange }) => {
  let formItemView = '';
  switch (formItem.type) {
    case 'select':
      formItemView = (
        <SelectItem
          value={searchValue[formItem.dataIndex]}
          formItem={formItem}
          onFormItemChange={onFormItemChange}
        />
      );
      break;
    case 'searchSelect':
      formItemView = (
        <SelectItem
          value={searchValue[formItem.dataIndex]}
          formItem={formItem}
          onFormItemChange={onFormItemChange}
        />
      );
      // formItemView = (
      //   <SearchSelectItem
      //     value={searchValue[formItem.dataIndex]}
      //     formItem={formItem}
      //     onFormItemChange={onFormItemChange}
      //   />
      // );
      break;
    case 'datePicker': {
      const startIndex = `${formItem.dataIndex}Start`;
      const endIndex = `${formItem.dataIndex}End`;
      formItemView = (
        <RangePickerItem
          formItem={formItem}
          startValue={searchValue[startIndex]}
          endValue={searchValue[endIndex]}
          onFormItemChange={onFormItemChange}
        />
      );
      break;
    }
    case 'group':
      formItemView = (
        <GroupItem
          group={formItem.group || []}
          searchValue={searchValue}
          onFormItemChange={onFormItemChange}
        />
      );
      break;
    case 'input':
      formItemView = (
        <InputItem
          value={searchValue[formItem.dataIndex]}
          formItem={formItem}
          onFormItemChange={onFormItemChange}
        />
      );
      break;
    case 'slide':
      formItemView = (
        <SlideItem
          className={styles.slideItemContainer}
          value={searchValue[formItem.dataIndex]}
          options={formItem.options}
          onChange={
            useCallback((value, op) => {
              onFormItemChange({ [formItem.dataIndex]: value }, formItem, { [op.value]: op.label });
            }, [formItem])
          }
        />
      );
      break;
    default:
      formItemView = <span>请指定type</span>;
  }
  return formItemView;
});
