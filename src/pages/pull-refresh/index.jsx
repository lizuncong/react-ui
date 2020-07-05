import React from 'react';
import PullRefresh from 'components/pull-refresh';

import styles from './index.module.less';

const Index = () => (
  <div className={styles.container}>
    上拉加载
    <div className={styles.wrap}>
      <PullRefresh>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => (
            <div key={item} className={styles.item}>
              {item}
            </div>
          ))
        }
      </PullRefresh>
    </div>
  </div>
);

export default Index;
