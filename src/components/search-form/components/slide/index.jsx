import React, { memo } from 'react';
import styles from './index.less';

const Index = memo(({
  options = [], value, onChange, className,
}) => (
  <div className={[styles.slide, className].join(' ')}>
    {
        options.map((op) => (
          <div
            key={op.value}
            className={[styles.item, value === op.value && styles.selected].join(' ')}
            onClick={() => {
              if (op.value === value) return;
              onChange(op.value, op);
            }}
          >
            <div tabIndex="0" className={styles.dot} />
            <span className={styles.label}>{op.label}</span>
          </div>
        ))
      }
  </div>
));

export default Index;
