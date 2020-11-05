import React, { memo, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { prefixCls } from './util';
import './style';

const Index = memo(({ value }) => {
  const articleRef = useRef(null);
  const wrapRef = useRef(null);
  useEffect(() => {
    const articleEl = articleRef.current;
    const {
      height: articleHeight, width: articleWidth,
    } = articleEl.getBoundingClientRect();

    const { height: wrapHeight } = wrapRef.current.getBoundingClientRect();

    const columns = Math.ceil(articleHeight / wrapHeight);
    articleEl.classList.add(`${prefixCls}-article`);
    articleEl.style.columns = `${articleWidth}px 1`;

    articleEl.style.transform = 'translateX(-140px)';
  }, []);
  const cls = classNames(
    prefixCls,
  );
  return (
    <div
      className={cls}
      ref={wrapRef}
    >
      <article
        ref={articleRef}
        // className={`${prefixCls}-article`}
      >
        {value}
      </article>
    </div>
  );
});

export default Index;
