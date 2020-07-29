import React, { memo } from 'react';
import { Button } from 'shineout';
import { VOCICON } from '@/public/common/const';
import styles from '../../../index.scss';

const Index = memo(({
  gridRows, show, onMoreClick, onFormItemChange,
}) =>
  (
    <div className={styles.btn}>
      {
        gridRows > 1
          ? (
            <span
              className={styles.more}
              onClick={() => {
                onMoreClick(!show);
              }}
            >
                  更多
              <VOCICON
                className={[styles.icon, show && styles.up].join(' ')}
                type="icon-down1"
              />
            </span>
          )
          : ''
      }
      <Button
        type="primary"
        className={styles.search}
        onClick={() => {
          onFormItemChange({}, { type: 'searchBtn', autoSearch: true });
        }}
      >
        <VOCICON type="icon-search" />
        搜索
      </Button>
      <Button
        type="primary"
        onClick={() => {
          onFormItemChange({}, { type: 'resetBtn', autoSearch: true });
        }}
      >
        <VOCICON type="icon-reset" />
        重置
      </Button>
    </div>
  ));

export default Index;
