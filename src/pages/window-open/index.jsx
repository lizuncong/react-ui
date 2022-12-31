import React, { useState } from "react";
import styles from "./index.module.less";
import Modal from "./Modal";

class Index extends React.PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <div className="demo-title">React多窗口数据共享</div>
        <div id="desc" className="description">
          React多窗口数据共享demo
        </div>
        <div className={styles.wrap}>test</div>
      </div>
    );
  }
}

function App() {
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div className={styles.container}>
      <div className="demo-title">React多窗口数据共享</div>
      <div id="desc" className="description">
        React多窗口数据共享demo
      </div>
      <div
        onClick={() => {
          setCount(count + 1);
        }}
      >
        这是主窗口计数器： <span className={styles.count}>{count}</span>
      </div>
      <div>
        <button
          onClick={() => {
            setModalVisible(true);
          }}
        >
          打开子窗口
        </button>
      </div>
      <Modal
        closeAfterBlur={false}
        onClose={() => setModalVisible(false)}
        visible={modalVisible}
      >
        <div onClick={() => setCount(count + 1)}>
          子窗口共享父窗口的计数器：
          <span className={styles.count}>{count}</span>
        </div>
      </Modal>
    </div>
  );
}
export default App;
