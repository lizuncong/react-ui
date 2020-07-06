import React from 'react';
import Spin from 'components/spin';

const Index = () => (
  <div className="container">
    <div className="demo-block">
      <div className="demo-title">基本用法</div>
      <div className="description">一个简单的loading状态</div>
      <Spin />
    </div>
  </div>
);

export default Index;
