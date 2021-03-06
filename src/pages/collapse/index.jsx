import React from 'react';
import Collapse from 'components/collapse';
import styles from './index.module.less';

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      show2: false,
    };
  }

  render() {
    const { show, show2 } = this.state;
    return (
      <div className={styles.container}>
        <div className="demo-title">折叠面板</div>
        <div className="description">
          当元素内容高度不固定时，可以使用这个折叠面板
        </div>
        <div className={styles.wrap}>
          <Collapse
            className={styles.block}
            header="默认展开"
            show={show}
            showDownIcon
            onDownIconClick={() => { this.setState({ show: !show }); }}
          >
            {
              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <div key={item}>{item}、这是一行文本这是一行文本</div>
              ))
            }
          </Collapse>
        </div>
        <div className={styles.wrap}>
          <Collapse
            className={styles.block}
            header="默认收起"
            show={show2}
            showDownIcon
            onDownIconClick={() => { this.setState({ show2: !show2 }); }}
          >
            {
              [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <div key={item}>{item}、这是一行文本这是一行文本</div>
              ))
            }
          </Collapse>
        </div>
      </div>
    );
  }
}

export default Index;
