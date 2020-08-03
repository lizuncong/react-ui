import React, { useState } from 'react';
import { FixedSizeList } from 'components/react-scroll';

import styles from './index.module.less';

const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);

const Index = () => (
  <div className={styles.container}>
    <div className="demo-title">长列表虚拟滚动</div>
    <div className={styles.wrap}>
      <FixedSizeList
        height={150}
        itemCount={10000}
        itemSize={35}
        width={300}
      >
        { Row }
      </FixedSizeList>
    </div>
  </div>
);

export default Index;
