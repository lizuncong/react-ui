import React, { memo } from 'react';
import { prefixCls } from './util';

const Index = memo(({ show, refresh }) => {
  if (!show) return '';
  return (
    <div className={`${prefixCls}-error`}>
      <div>图片加载失败</div>
      <span
        className={`${prefixCls}-refresh-btn`}
        onClick={() => {
          refresh();
        }}
      >
        点我重新加载
      </span>
    </div>
  );
});

export default Index;
