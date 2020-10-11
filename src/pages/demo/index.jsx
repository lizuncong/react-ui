import React from 'react';
import Demo from './demo';
import styles from './index.module.less';

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="demo-title">测试代码</div>
        <div className="description">
          useLayoutEffect 与 useEffect 差别
        </div>
        <div className={styles.wrap}>
          <Demo />
        </div>
      </div>
    );
  }
}

export default Index;
