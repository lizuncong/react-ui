import React from 'react';
import ImageCompress from 'components/img-upload';
import styles from './index.module.less';

const Index = () => (
  <div className={styles.container}>
    <div className={styles.row}>
      <div className={styles.title}>图片压缩组件</div>
      <ImageCompress />
    </div>
  </div>
);

export default Index;
