import React from 'react';
import Ellipse from 'components/ellipse';
import styles from './index.module.less';

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="demo-title">长文本截取</div>
        <div className="description">
          当文本内容过长时，截取文本并悬浮显示完整文本
        </div>
        <div>
          <Ellipse
            value="这是一段长文本这是一段长文本这是一段长文本这是一段长文本这是一段长文本"
          />
        </div>
      </div>
    );
  }
}

export default Index;
