import React, { useState, useRef } from 'react';
import ImageCompress from 'components/img-upload';
import Paste from 'components/paste';
import styles from './index.module.less';

const Index = () => {
  const [fileObjs, setFileObjs] = useState([]);
  const compressRef = useRef(null);
  const compressRef2 = useRef(null);

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
          compressRef.current.addFile(file);
        }}
      >
        <div
          className={styles.row}
        >
          <div className={styles.title}>剪切并粘贴图片1</div>
          <ImageCompress
            onRef={(reference) => { compressRef.current = reference; }}
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
          compressRef2.current.addFile(file);
        }}
      >
        <div
          className={styles.row}
        >
          <div className={styles.title}>剪切并粘贴图片2</div>
          <ImageCompress
            maxLength={5}
            onRef={(reference) => { compressRef2.current = reference; }}
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
