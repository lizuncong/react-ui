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
  title, label, value, onClick,
  disabledClear,
}) => (
  <span className={`${prefixCls}-label-container`}>
    {title}：
    <LabelItem
      label={label}
      value={value}
      disabledClear={disabledClear}
      onClick={() => onClick()}
    />
  </span>
));

export default Index;
