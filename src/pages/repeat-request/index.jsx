import React from 'react';
import { Button } from 'antd';
import request from 'util/request';
import styles from './index.module.less';

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      list2: [],
      count2: 1,
      count: 1,
    };
  }

  render() {
    const {
      list, count, count2, list2,
    } = this.state;
    return (
      <div className={styles.container}>
        <div className="demo-title">重复请求</div>
        <div>
          快速点击查询列表数据按钮，依次发起请求。假设由于网络等原因，第一次请求的结果可能需要等待10秒才返回给前端，第二次请求只需要1秒就返回，
          此时第二次请求结果先回来，然后第一次的结果最后回来并覆盖掉第二次的结果。显然我们需要的是第二次的结果。这种场景多见于列表查询接口，或者
          多个tab页快速切换时导致的奇奇怪怪的问题。
          <div className={styles.warn}>
            需要考虑的问题：
            <div>1.不是每个请求都是需要取消重复请求的，比如表单提交肯定是以第一次提交的结果为主。因此取消重复请求需要做成可配置的</div>
            <div>2.还要注意url相同，但请求方法不同，比如get，post请求等这些情况</div>
          </div>
        </div>
        <div>
          <Button
            onClick={() => {
              this.setState({
                count: count + 1,
              });
              setTimeout(async () => {
                const result = await request.get({
                  url: '/repeat-list',
                  useLast: true, // 开启取消重复请求配置
                  data: {
                    count,
                  },
                });
                if (result) {
                  this.setState({
                    list: result.data,
                  });
                }
              }, 0);
            }}
          >
            查询列表数据：取消重复请求
          </Button>
        </div>
        <div className={styles.wrap}>
          {
            list.map((item) => (
              <div key={item.title}>
                {item.title}
              </div>
            ))
          }
        </div>
        <div style={{ marginTop: '20px' }}>
          <Button
            onClick={() => {
              this.setState({
                count2: count2 + 1,
              });
              setTimeout(async () => {
                const result = await request.get({
                  url: '/repeat-list',
                  data: {
                    count: count2,
                  },
                });
                if (result) {
                  this.setState({
                    list2: result.data,
                  });
                }
              }, 0);
            }}
          >
            查询列表数据：重复请求
          </Button>
        </div>
        <div className={styles.wrap}>
          {
            list2.map((item) => (
              <div key={item.title}>
                {item.title}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Index;
