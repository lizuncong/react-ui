import React, { memo, useCallback, useRef } from 'react';
import classnames from 'classnames';
import { prefixCls } from './utils';

const Index = memo(({ onFileSelected, hidden }) => {
  const inputEl = useRef(null);
  const onInputChange = useCallback((e) => {
    const { files } = e.target;
    onFileSelected(files);
    e.target.value = '';
  }, []);

  const cls = classnames(
    `${prefixCls}-item`,
    `${prefixCls}-add`,
    {
      [`${prefixCls}-hidden`]: hidden,
    },
  );
  return (
    <div className={cls}>
      <div
        className={`${prefixCls}-input-container`}
        onClick={() => {
          inputEl.current.click();
        }}
      >
        <span className={`${prefixCls}-upload-icon`}>+</span>
        <input
          className={`${prefixCls}-file-input`}
          ref={inputEl}
          type="file"
          name="file"
          multiple="multiple"
          accept="image/*"
          onChange={onInputChange}
        />
      </div>
    </div>
  );
});

export default Index;
