import React, { memo } from 'react';
import classNames from 'classnames';
import { prefixCls } from './util';

const Index = memo(({ loading }) => {
  const cls = classNames(
    `${prefixCls}-loading-container`,
    !loading && `${prefixCls}-hide`,
  );
  return (
    <div
      className={cls}
    >
      <div className={`${prefixCls}-loading`}>
        <div />
        <div className={`${prefixCls}-ball`} />
        <div className={`${prefixCls}-ball`} />
        <div className={`${prefixCls}-ball`} />
        <div className={`${prefixCls}-ball`} />
      </div>
    </div>
  );
});

export default Index;
