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
  title, label, value, onClick,
  disabledClear,
}) => (
  <span className={styles.labelContainer}>
    {title}：
    <LabelItem
      label={label}
      value={value}
      disabledClear={disabledClear}
      onClick={() => onClick()}
    />
  </span>
));

export default Index;
