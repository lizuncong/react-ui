import React from 'react';
import styles from './index.module.less';

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    const { count } = this.state;
    this.setState({ count: count + 1 });
    console.log('异步的...', count);
    Promise.resolve().then((res) => {
      console.log('prev..', this.state.count);
      this.setState({ count: this.state.count + 1 });
      console.log('after...', this.state.count);
    });
    window.addEventListener('click', () => {
      console.log('window.click..', this.state.count);
      this.setState({ count: this.state.count + 1 });
      console.log('after..window..click..', this.state.count);
    });
  }

  render() {
    const { count } = this.state;
    return (
      <div className={styles.container}>
        <div className="demo-title">测试页面</div>
        <div id="desc" className="description">
          单纯拿来测试setState的异步和同步问题的
        </div>
        <div className={styles.wrap}>
          <div
            onClick={(e) => {
              // console.log('before..click..', this.state.count);
              // this.setState({ count: this.state.count + 1 });
              // console.log('after..click..', this.state.count);
              console.log('e..', e.nativeEvent);
            }}
          >
            click
          </div>
          x嘻嘻{count}
        </div>
        <div className={styles.blockContainer}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => (
              <div key={item} className={styles.block}>{item}</div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Index;
