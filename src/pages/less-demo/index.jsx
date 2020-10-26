import React, { memo, useRef } from 'react';
import './index.less';

const Index = memo(() => {
  return (
    <div className="less-demo">
      <div className="demo-title">学习less高级语法</div>
      <div className="description">
        placeholder
      </div>
      <div className="wrap">
        <div id="header">
          <div>变量用法</div>
          <button className="button">按钮</button>
        </div>
        <div>
          <div className="circle">1</div>
          <div className="circle">2</div>
          <div className="circle">3</div>
        </div>
      </div>
    </div>
  );
});

export default Index;
