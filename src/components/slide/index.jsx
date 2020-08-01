import React, { memo } from 'react';
import { prefixCls } from './utils';
import './style';

const Index = memo(({
  options = [], value, onChange, className,
}) => (
  <div className={[`${prefixCls}`, className].join(' ')}>
    {
        options.map((op) => (
          <div
            key={op.value}
            className={[`${prefixCls}-item`, value === op.value && `${prefixCls}-selected`].join(' ')}
            onClick={() => {
              if (op.value === value) return;
              onChange(op.value, op);
            }}
          >
            <div tabIndex="0" className={`${prefixCls}-dot`} />
            <span className={`${prefixCls}-label`}>{op.label}</span>
          </div>
        ))
      }
  </div>
));

export default Index;
