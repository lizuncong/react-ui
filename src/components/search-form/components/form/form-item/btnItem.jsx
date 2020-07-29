import React, { memo } from 'react';
import { Button } from 'antd';
import IconFont from '../../../../IconFont';

const Index = memo(({
  gridRows, show, onMoreClick, onFormItemChange,
}) => {
  const prefixCls = 'rui-search-form';

  return (
    <div className={`${prefixCls}-btn`}>
      {
          gridRows > 1
            ? (
              <span
                className="more"
                onClick={() => {
                  onMoreClick(!show);
                }}
              >
                更多
                <IconFont
                  className={['icon', show && 'up'].join(' ')}
                  type="icon-down1"
                />
              </span>
            )
            : ''
        }
      <Button
        type="primary"
        className="search"
        onClick={() => {
          onFormItemChange({}, { type: 'searchBtn', autoSearch: true });
        }}
      >
        <IconFont type="icon-search" />
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
  );
});

export default Index;
