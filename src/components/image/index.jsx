import React, {
  memo, useState, useEffect, useRef,
} from 'react';
import classNames from 'classnames';
import Loading from './loading';
import Error from './error';
import { copy, prefixCls } from './util';
import './style';
/**
 * 图片加载失败重试
 * */
const Index = memo(({
  random,
  src,
  lazyLoad,
  width,
  height,
  size,
  className,
}) => {
  const [innerRandom, setInnerRandom] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  // 加载失败，点击重新加载按钮时，如果依旧加载失败，会发现loading显示时间过段以至于
  // 肉眼看不出在loading，因此做个判断，强制至少 retryTime 后再关闭loading。
  const refreshTimeRef = useRef(null);
  const retryTime = 1000; // 单位毫秒

  useEffect(() => {
    // 如果开启了懒加载，即lazyLoad为true，则第一次加载图片时显示loading动画
    if (lazyLoad) {
      setLoading(true);
    }
  }, [lazyLoad]);

  useEffect(() => {
    // 监听random变化，random用于外部引起的重新加载逻辑
    if (!random || success) return;
    setInnerRandom(random);
    refreshTimeRef.current = +new Date();
    if (lazyLoad) {
      setLoading(true);
    }
  }, [random, refreshTimeRef, success, lazyLoad]);

  const containerStyle = {};
  if (width) {
    containerStyle.width = `${width}px`;
  }
  if (height) {
    containerStyle.height = `${height}px`;
  }
  if (size) {
    containerStyle.width = `${size}px`;
    containerStyle.height = `${size}px`;
  }

  const cls = classNames(
    prefixCls,
    className,
  );
  return (
    <div
      className={cls}
      style={containerStyle}
    >
      <img
        className={`${prefixCls}-img`}
        src={success || !innerRandom ? src : `${src}?${innerRandom}`}
        alt=""
        onLoad={(e) => {
          // 图片成功加载完成
          setLoading(false);
          setSuccess(true);
        }}
        onError={(e) => {
          const currentTime = +new Date();
          if (!refreshTimeRef.current || (currentTime - refreshTimeRef.current) > retryTime) {
            // 如果是点击重新加载按钮触发的刷新图片，应当设置个阀值，不用那么快关闭loading
            setLoading(false);
            setError(true);
            setSuccess(false);
          } else {
            window.setTimeout(() => {
              setLoading(false);
              setError(true);
              setSuccess(false);
            }, retryTime);
          }
        }}
      />
      <Error
        show={error}
        refresh={() => {
          copy(src);
          refreshTimeRef.current = +new Date();
          setLoading(true);
          setError(false);
          setInnerRandom(Date.now());
        }}
      />
      <Loading loading={loading} />
    </div>
  );
});

export default Index;
