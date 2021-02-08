import React from 'react';
import { Button } from 'antd';
import request from 'util/request';
import styles from './index.module.less';

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      count: 1,
    };
  }

  render() {
    const { list, count } = this.state;
    return (
      <div className={styles.container}>
        <div className="demo-title">重复请求</div>
        <div>
          快速点击查询列表数据按钮，依次发起请求。假设由于网络等原因，第一次请求的结果可能需要等待10秒才返回给前端
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
            查询列表数据
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
      </div>
    );
  }
}

export default Index;
