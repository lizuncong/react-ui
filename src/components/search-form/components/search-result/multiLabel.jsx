import React, { useState, useEffect, memo } from 'react';
import styles from '../../index.scss';
import { VOCICON } from '../../../../common/const';

const LabelItem = memo(({
  disabledClear, label, value, onClick,
}) => (
  <span
    className={styles.label}
  >
    {label}
    {
        !disabledClear &&
        <VOCICON
          type="icon-x"
          className={styles.close}
          onClick={() => onClick()}
        />
      }
  </span>
));

const Index = memo(({
  disabledClear, title, items, onClick,
}) => (
  <span className={styles.labelContainer}>
    {title}：
    {
      items.map(item => (
        <LabelItem
          key={item.value}
          disabledClear={disabledClear}
          label={item.label}
          value={item.value}
          onClick={() => {
            onClick(items.filter(i => i.value !== item.value).map(i => ({ ...i })));
          }}
        />
      ))
    }
  </span>
));

export default Index;
