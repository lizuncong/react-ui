import React, { memo } from 'react';
import classNames from 'classnames';
import { prefixCls } from './util';
import './style';

const Index = memo(({ value }) => {
  console.log('haha');
  const cls = classNames(
    prefixCls,
  );
  return (
    <div className={cls}>
      {value}
    </div>
  );
});

export default Index;
