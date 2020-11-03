import React, { useState, useRef } from 'react';
import ImageCompress from 'components/img-upload';
import Paste from 'components/paste';
import styles from './index.module.less';

const Index = () => {
  const [fileObjs, setFileObjs] = useState([]);
  const compressRef = useRef(null);
  console.log('fileObjs...', fileObjs);
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.title}>图片压缩组件</div>
        <ImageCompress
          maxLength={5}
          maxSize={1000}
          onChange={(files) => {
            setFileObjs(files);
          }}
        />
      </div>
      <Paste
        onPaste={(file) => {
          console.log('file...', file);
          compressRef.current.onInputChange({
            0: file,
          });
        }}
      >
        <div
          className={styles.row}
        >
          <div className={styles.title}>粘贴图片1</div>
          <ImageCompress
            ref={(reference) => compressRef.current = reference}
            maxLength={5}
            maxSize={300}
            onChange={(files) => {
              setFileObjs(files);
            }}
          />
        </div>
      </Paste>
      <Paste
        onPaste={(file) => {
          console.log('file...', file);
        }}
      >
        <div
          className={styles.row}
        >
          <div className={styles.title}>粘贴图片2</div>
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
