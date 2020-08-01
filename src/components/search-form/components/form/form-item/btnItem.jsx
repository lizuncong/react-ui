import React, { memo } from 'react';
import { Button } from 'antd';
import IconFont from '../../../../IconFont';
import { prefixCls } from '../../../utils';

const Index = memo(({
  gridRows, show, onMoreClick, onFormItemChange,
}) => (
  <div className={`${prefixCls}-btn`}>
    {
          gridRows > 1
            ? (
              <span
                className={`${prefixCls}-more`}
                onClick={() => {
                  onMoreClick(!show);
                }}
              >
                更多
                <IconFont
                  className={[`${prefixCls}-icon`, show && `${prefixCls}-up`].join(' ')}
                  type="icon-Down"
                />
              </span>
            )
            : ''
        }
    <Button
      type="primary"
      className={`${prefixCls}-search`}
      onClick={() => {
        onFormItemChange({}, { type: 'searchBtn', autoSearch: true });
      }}
    >
      <IconFont type="icon-off" />
      搜索
    </Button>
    <Button
      type="primary"
      onClick={() => {
        onFormItemChange({}, { type: 'resetBtn', autoSearch: true });
      }}
    >
      <IconFont type="icon-reset" />
      重置
    </Button>
  </div>
));

export default Index;
