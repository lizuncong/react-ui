import React from 'react';
import TransFormTable from 'components/transform-table';
import styles from './index.module.less';

// 后端返回的数据
const data = [
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
];

const colTemp = [ // 构造前两列的数据
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

const rows = [
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
            }}
          />
        )
    ),
  },
  {
    dataIndex: 'stockNum',
  },
];

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="demo-title">表格倒置</div>
        <div className={styles.wrap}>
          <TransFormTable
            colWidth={100}
            titleIndex="sizeName"
            columns={[...colTemp, ...data]}
            dataSource={rows}
          />
        </div>
      </div>
    );
  }
}

export default Index;
