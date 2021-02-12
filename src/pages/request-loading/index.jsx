import React from 'react';
import { Button } from 'antd';
import request from 'util/request';
import styles from './index.module.less';

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.count = 0;
    this.state = {
      list: [],
      list2: [],
    };
  }

  render() {
    const {
      list,
      list2,
    } = this.state;
    return (
      <div className={styles.container}>
        <div className="demo-title">请求loading效果</div>
        <div>
          在平时开发中，发送请求时，经常需要给按钮或者数据显示的地方加loading，大多数的做法都是通过维护一个loading状态，请求开始时，
          通过this.setState将loading设置为true，在请求结果返回后再通过this.setState将结果设置为false。同时还需要写个loading的菊花。
          这一系列过程，不是难，而是繁琐，因此可不可以简化一下这个流程，通过配置的方式，在请求开始时，自动给需要loading的dom加loading效果，
          请求结束后再移除掉loading效果。
          <div>
            解决方法：
            <div>
              先给需要loading的dom元素设置一个唯一的id，在发送请求时，将这个id传给请求方法，在请求方法里面执行这些逻辑。
              如果是同时发起了多次请求，则等最后一次请求结果返回再关闭loading。这里关键是怎么把loading加上去，一开始的想法是
              给dom设置position:relative样式，然后追加一个position: absolute定位的元素作为该dom的子元素，但这样就改变了dom
              的position属性，容易引发奇怪的问题。因此这里的做法是给dom增加transform样式，然后追加一个position:fixed定位的元素作为
              子元素，fixed定位就相对于该dom元素了。还需要考虑dom元素本身是否已经有transform属性了，以及dom是否设置了overflow:hidden。
              如果dom没有设置overflow:hidden，那么loading的遮罩就会超出dom的范围。同时还要考虑dom原本的transition属性
            </div>
          </div>
        </div>
        <div>
          <Button
            id="btn"
            type="primary"
            onClick={async () => {
              const result = await request.get({
                url: '/list',
                loadingDOM: 'btn',
              });
              if (result) {
                this.setState({
                  list: result.data,
                });
              }
            }}
          >
            查询列表数据，给按钮加loading
          </Button>
        </div>
        <div id="list1" className={styles.list1}>
          {
            list.map((item) => (
              <div key={item.title}>
                {item.title}
              </div>
            ))
          }
        </div>
        <div>
          <Button
            onClick={async () => {
              const result = await request.get({
                url: '/list',
                loadingDOM: 'list',
              });
              if (result) {
                this.setState({
                  list2: result.data,
                });
              }
            }}
          >
            查询列表数据，给列表显示区域加loading
          </Button>
        </div>
        <div id="list" className={styles.list}>
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
