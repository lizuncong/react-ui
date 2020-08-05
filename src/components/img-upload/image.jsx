import React, { memo } from 'react';
import { prefixCls } from 'src/components/img-upload/utils';
import classNames from 'classnames';
import Icon from '../IconFont';

/*
* isCompressing 正在压缩状态, 如果为true，则显示压缩的进度条
* */
const Index = memo(({ src, isCompressing, onDelete }) => {
  const imgCls = classNames(
    `${prefixCls}-img`,
    {
      [`${prefixCls}-filter`]: isCompressing,
    },
  );
  return (
    <div
      className={`${prefixCls}-item`}
    >
      <img
        src={src}
        className={imgCls}
        alt=""
      />
      {
        isCompressing
          ? (
            <div className={`${prefixCls}-progress`}>
              <div className={`${prefixCls}-progress-highlight`} />
            </div>
          )
          : (
            <Icon
              className={`${prefixCls}-delete`}
              type="icon-Cancel"
              onClick={() => {
                onDelete();
              }}
            />
          )
      }
    </div>
  );
});

export default Index;
