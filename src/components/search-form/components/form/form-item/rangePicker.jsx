import React, { memo } from 'react';
import moment from 'moment';
import RangePicker from '../range-picker';

const Index = memo(({
  formItem, startValue, endValue, onFormItemChange,
}) => {
  const startIndex = `${formItem.dataIndex}Start`;
  const endIndex = `${formItem.dataIndex}End`;
  if (formItem.showTime && formItem.showTime.defaultValue) {
    formItem.showTime.defaultValue = [
      moment('00:00:00', formItem.showTime.format),
      moment('23:59:59', formItem.showTime.format),
    ];
  }
  return (
    <RangePicker
      disabledClear={formItem.disabledClear}
      start={startValue}
      end={endValue}
      ranges={formItem.ranges}
      showTime={formItem.showTime}
      format={formItem.format}
      onChange={(dateStrings) => {
        if (!dateStrings || !dateStrings[0]) {
          onFormItemChange({
            [startIndex]: undefined,
            [endIndex]: undefined,
          }, formItem);
        } else {
          onFormItemChange({
            [startIndex]: dateStrings[0],
            [endIndex]: dateStrings[1],
          }, formItem);
        }
      }}
    />
  );
});

export default Index;
