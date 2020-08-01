import React, { memo } from 'react';
import IconFont from '../../../IconFont';
import { prefixCls } from '../../utils';

const LabelItem = memo(({
  disabledClear, label, onClick,
}) => (
  <span
    className={`${prefixCls}-label`}
  >
    {label}
    {
        !disabledClear
        && (
        <IconFont
          type="icon-Cancel"
          className={`${prefixCls}-close`}
          onClick={() => onClick()}
        />
        )
      }
  </span>
));

const Index = memo(({
  disabledClear, title, items, onClick,
}) => (
  <span className={`${prefixCls}-label-container`}>
    {title}：
    {
      items.map((item) => (
        <LabelItem
          key={item.value}
          disabledClear={disabledClear}
          label={item.label}
          value={item.value}
          onClick={() => {
            onClick(items.filter((i) => i.value !== item.value).map((i) => ({ ...i })));
          }}
        />
      ))
    }
  </span>
));

export default Index;
