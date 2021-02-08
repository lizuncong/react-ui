import React from 'react';
import TransFormTable from 'components/transform-table';
import styles from './index.module.less';
import img01 from './img-01.jpg';

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [ // 后端返回的数据结构就长这样
        {
          sizeName: 'L', // 尺码
          orderNum: 20, // 下单数
          stockNum: 32, // 库存数
        },
        {
          sizeName: 'XL', // 尺码
          orderNum: 28, // 下单数
          stockNum: 26, // 库存数
        },
        {
          sizeName: 'XXL', // 尺码
          orderNum: 19, // 下单数
          stockNum: 56, // 库存数
        },
      ],
    };
  }

  getColTemp() {
    const { data } = this.state;
    return [ // 构造前两列的数据
      {
        sizeName: '尺码',
        width: 140,
        orderNum: '下单数',
        stockNum: '库存数',
      },
      {
        sizeName: '总数',
        width: 120,
        orderNum: data.reduce((sum, cur) => sum + Number(cur.orderNum), 0),
        stockNum: data.reduce((sum, cur) => sum + Number(cur.stockNum), 0),
      },
    ];
  }

  renderRows() {
    const { data } = this.state;
    return [
      {
        dataIndex: 'orderNum',
        renderCol: (col, index) => (
          index < 2
            ? col.orderNum
            : (
              <input
                value={col.orderNum}
                placeholder=""
                onChange={(e) => {
                  col.orderNum = e.target.value;
                  this.setState({
                    data: [...data],
                  });
                }}
              />
            )
        ),
      },
      {
        dataIndex: 'stockNum',
      },
    ];
  }

  render() {
    const { data } = this.state;
    return (
      <div className={styles.container}>
        <div className="demo-title">表格倒置</div>
        <div className="description">
          如果后端返回的数据是按照列的格式返回，则可以使用这个组件渲染。比如后端返回如下格式：
          <img className={styles.demoImg} src={img01} alt="" />
          显然，这并不是antd表格渲染所需要的数据结构，当我们拿到这个数据时，还需要进行进一步的转换，构造成
          antd表格所需要的数据，这个步骤比较麻烦，影响开发效率。因此需要统一封装组件进行抽象
        </div>
        <div className={styles.wrap}>
          <TransFormTable
            colWidth={100}
            titleIndex="sizeName"
            columns={[...this.getColTemp(), ...data]}
            dataSource={this.renderRows()}
          />
        </div>
      </div>
    );
  }
}

export default Index;
