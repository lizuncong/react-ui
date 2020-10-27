import React, {
  memo, useRef, useState, useEffect,
} from 'react';
import './index.less';

const Button = memo(({ }) => {
  const [id, setId] = useState(0);
  const myRef = useRef(null);
  useEffect(() => {
    myRef.current = setInterval(() => {
      console.log('haha', id);
    }, 1000);
    return () => {
      console.log('clear...');
      clearInterval(myRef.current);
    };
  }, [id]);
  return (
    <div
      onClick={() => {
        setId(id + 1);
      }}
    >
      button{id}
    </div>
  );
});

const Index = memo(() => (
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
    <Button />
  </div>
));

export default Index;
