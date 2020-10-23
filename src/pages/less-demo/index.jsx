import React, { memo } from 'react';
import Test from './test';
import './index.less';

const Index = memo(() => (
  <div className="less-demo">
    <div className="demo-title">学习less高级语法</div>
    <div className="description">
      placeholder
    </div>
    <div className="wrap">
      <div id="header">
        变量用法
        <button>按钮</button>
      </div>
      <div>
        <div className="circle">1</div>
        <div className="circle">2</div>
        <div className="circle">3</div>
      </div>
      <Test list={undefined} />
    </div>
  </div>
));

export default Index;
