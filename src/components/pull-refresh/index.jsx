import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import './style';

const Index = ({ children, className }) => {
  const scrollTopRef = useRef();
  const [loading, setLoading] = useState(false);
  const prefixCls = 'rui-pull-refresh';
  const cls = classNames(
    prefixCls,
    className,
  );
  return (
    <div
      className={cls}
      onScroll={(e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        const maxScrollTop = scrollHeight - clientHeight;
        const isDown = scrollTop - scrollTopRef.current;
        scrollTopRef.current = scrollTop;
        console.log('scroll...', scrollTop);
        if (maxScrollTop - scrollTop < 50 && isDown && !loading) {
          console.log('加载更多...');
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 5000);
        }
      }}
    >
      { children }
      <div className={`${prefixCls}-loader`}>
        {loading ? '正在加载' : '加载完成'}
      </div>
    </div>
  );
};

export default Index;
