import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import './style';

const Index = ({
  children, onRequest,
  hasMore, className,
}) => {
  const scrollTopRef = useRef();
  const [loading, setLoading] = useState(false);
  const [scrHeight, setScrollHeight] = useState(0);
  const handleRequest = () => Promise.resolve()
    .then(() => onRequest && onRequest()).then(() => {
      setLoading(false);
    }).catch((err) => {
      console.log('出错啦。。。', err);
      setLoading(false);
    });

  useEffect(() => {
    setLoading(true);
    handleRequest();
  }, []);
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
        if (maxScrollTop - scrollTop < 1 && hasMore && isDown && !loading) {
          setLoading(true);
          setScrollHeight(scrollHeight);
          handleRequest();
        }
      }}
    >
      { children }
      {
        loading
        && (
        <div
          style={{
            top: scrHeight ? `${scrHeight - 40}px` : '0',
            bottom: scrollTopRef.current ? `-${scrollTopRef.current}px` : '0',
          }}
          className={`${prefixCls}-loader`}
        >
          正在加载.....
        </div>
        )
      }
      {
        !hasMore && (
          <div className={`${prefixCls}-nomore`}>
            没有更多啦
          </div>
        )
      }
    </div>
  );
};

export default Index;
