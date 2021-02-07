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
  onClick,
  onError,
  className,
  width,
  height,
  size,
}) => {
  const split = (src || '').indexOf('?') > -1 ? '&ruiimg=' : '?ruiimg=';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  // 加载失败，点击重新加载按钮时，如果依旧加载失败，会发现loading显示时间过短以至于
  // 肉眼看不出在loading，因此做个判断，强制至少 retryTime 毫秒 后再关闭loading。
  const refreshTimeRef = useRef(null);
  const retryTime = 1000; // 单位毫秒

  useEffect(() => {
    setImgSrc(src);
    setError(false);
    setLoading(false);
  }, [src]);
  useEffect(() => {
    // 没出错，则不需要刷新
    if (!error) return;
    // 监听random变化，random用于外部引起的重新加载逻辑
    refreshTimeRef.current = +new Date();
    setLoading(true);
    setImgSrc((prev) => (prev.indexOf(split) > -1 ? src : `${src}${split}${random}`));
  }, [random, refreshTimeRef]);

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

  const errorOccur = () => {
    setLoading(false);
    setError(true);
    if (onError) onError();
  };
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
        onClick={onClick}
        className={`${prefixCls}-img`}
        src={imgSrc}
        alt=""
        onLoad={() => {
          setLoading(false);
          setError(false);
        }}
        onError={() => {
          const currentTime = +new Date();
          if (!refreshTimeRef.current || (currentTime - refreshTimeRef.current) > retryTime) {
            // 如果是点击重新加载按钮触发的刷新图片，应当设置个阀值，不用那么快关闭loading
            errorOccur();
          } else {
            window.setTimeout(() => {
              errorOccur();
            }, retryTime);
          }
        }}
      />
      <Error
        show={error && !loading}
        refresh={() => {
          copy(src);
          refreshTimeRef.current = +new Date();
          setLoading(true);
          const temp = imgSrc.indexOf(split) > -1 ? src : `${src}${split}${Date.now()}`;
          setImgSrc(temp);
        }}
      />
      <Loading loading={loading} />
    </div>
  );
});

export default Index;
