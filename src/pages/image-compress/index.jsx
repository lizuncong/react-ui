import React, { useState } from 'react';
import ImageCompress from 'components/img-upload';
import Paste from './paste';
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
      <Paste
        disabled={false}
        onPaste={(file) => {
          console.log('file...', file);
        }}
      >
        <div
          className={styles.row}
          onFocus={(e) => {
            console.log('外部focus...', e.target);
          }}
        >
          <div className={styles.title}>粘贴</div>
          <ImageCompress
            maxLength={5}
            maxSize={300}
            onChange={(files) => {
              setFileObjs(files);
            }}
          />
        </div>
      </Paste>
    </div>
  );
};

export default Index;
