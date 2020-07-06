import React, { useState } from 'react';
import PullRefresh from 'components/pull-refresh';

import styles from './index.module.less';

const Index = () => {
  const [data, setData] = useState([]);
  const [more, setMore] = useState(true); // 是否还有更多
  const getData = () => new Promise((resolve) => {
    window.setTimeout(() => {
      const { length } = data;
      for (let i = length; i < (10 + length); i++) {
        data.push(i);
      }
      setData([...data]);
      if (data.length > 100) {
        setMore(false);
      }
      resolve(true);
    }, 5000);
  });
  return (
    <div className={styles.container}>
      上拉加载
      <div className={styles.wrap}>
        <PullRefresh
          onRequest={() => getData()}
          hasMore={more}
        >
          {
            data.map((item) => (
              <div key={item} className={styles.item}>
                {item}
              </div>
            ))
          }
        </PullRefresh>
      </div>
    </div>
  );
};

export default Index;
