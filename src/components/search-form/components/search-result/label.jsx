import React, { memo } from 'react';
import IconFont from '../../../IconFont';
import styles from '../../index.less';

const LabelItem = memo(({
  disabledClear, label, onClick,
}) => (
  <span
    className={styles.label}
  >
    {label}
    {
        !disabledClear
        && (
        <IconFont
          type="icon-x"
          className={styles.close}
          onClick={() => onClick()}
        />
        )
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
