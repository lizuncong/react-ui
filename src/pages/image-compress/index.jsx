import React, { useState } from 'react';
import ImageCompress from 'components/img-upload';
import styles from './index.module.less';

const Index = () => {
  const [fileObjs, setFileObjs] = useState([]);
  console.log('fileObjs...', fileObjs);
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.title}>图片压缩组件</div>
        <ImageCompress
          maxLength={5}
          maxSize={300}
          onChange={(files) => {
            setFileObjs(files);
          }}
        />
      </div>
    </div>
  );
};

export default Index;
