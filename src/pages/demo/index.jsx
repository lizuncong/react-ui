import React from 'react';
import Demo from './demo';
import styles from './index.module.less';

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
    };
  }

  render() {
    const { showMore } = this.state;
    return (
      <div className={styles.container}>
        <div className="demo-title">测试代码</div>
        <div className="description">
          useLayoutEffect 与 useEffect 差别
        </div>
        <div className={styles.wrap}>
          <Demo />
        </div>
        <div className="description">
          flex布局子元素宽度问题。使用flex布局让子元素水平居中，如果子元素宽度大于父容器的宽度，且
          父容器设置overflow:auto使得可以水平滚动时，我们会发现子元素左边会被遮住。
        </div>
        <div className={styles.wrap}>
          <span
            className={styles.click}
            onClick={() => {
              this.setState({
                showMore: !showMore,
              });
            }}
          >
            点击切换元素个数
          </span>
          {/* <div className={styles.flexWrap}> */}
          {/*  <div className={styles.flexContainer}> */}
          {/*    { */}
          {/*      (showMore ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [1, 2, 3]).map((item) => ( */}
          {/*        <div */}
          {/*          className={styles.square} */}
          {/*          key={item} */}
          {/*        > */}
          {/*          {item} */}
          {/*        </div> */}
          {/*      )) */}
          {/*    } */}
          {/*  </div> */}
          {/* </div> */}
          <div className={styles.flexContainer}>
            {
              (showMore ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [1, 2, 3]).map((item) => (
                <div
                  className={styles.square}
                  key={item}
                >
                  {item}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
