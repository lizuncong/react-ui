import React from 'react';
import ArticlePagination from 'components/article-pagination';
import styles from './index.module.less';

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className="demo-title">文章分页阅读，适用于移动端</div>
        <div className="description">
          当文章篇幅很长时，自动分页
        </div>
        <div className={styles.block}>
          <ArticlePagination
            value="11月2日，银保监会和央行共同发布《网络小额贷款业务管理暂行办法（征求意见稿）》，
            里面有一条直接关系到蚂蚁集团主营业务：在单笔联合贷款中，经营网络小额贷款业务的小额贷款公司出资比例
            不得低于30%。意见稿还对网络小贷公司的融资杠杆上限划定红线。过去蚂蚁集团将自己往科技公司撮堆，存在监管
            套利。但是，随着监管对金融科技认识的深化，监管的篱笆在扎紧。金融科技本质上是一种技术驱动的金融创新活动。
            无论叫金融科技还是科技金融，始终不能忘记金融属性，不能违背金融运行的基本规律。因此，监管上金融科技
            公司的管理属性发生重大变化，从事金融业务就应当按照业务属性纳入金融监管范畴，没有法外之地。这会不会影响
            蚂蚁赚钱的速度和利润率？如此重大的变化会不会影响蚂蚁集团股票估值？那么在上市之前，是否应该叫停？如果按
            上市前的定价，蚂蚁集团市值将达到3130亿美元。但是一旦上市之后，公司的财务模型、商业模式却需要重新拟定。
            11月3日晚，上交所发布关于暂缓蚂蚁科技集团股份有限公司科创板上市的决定。"
          />
        </div>
      </div>
    );
  }
}

export default Index;
