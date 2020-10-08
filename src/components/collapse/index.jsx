import React, {
  memo, useRef, useState, useEffect,
} from 'react';
import classNames from 'classnames';
import prefixCls from './utils';
import animation from './action';
import './style';

const Index = memo(({
  bodyCls,
  headerCls,
  className,
  show,
  showDownIcon,
  header,
  onDownIconClick,
  headerRight,
  children,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef(null);

  // useEffect(() => {
  //   const box = contentRef.current;
  //   animation(box, `${prefixCls}-legacy`, show);
  // }, [show]);

  const cls = classNames(
    prefixCls,
    className,
  );
  const contentCls = classNames(`${prefixCls}-body`, bodyCls, {
    [`${prefixCls}-content-show`]: show,
    [`${prefixCls}-content-hide`]: !show,
  });
  console.log('render....', show);
  return (
    <div className={cls}>
      <div className={classNames(`${prefixCls}-header`, headerCls)}>
        <div className={`${prefixCls}-left`}>{header}</div>
        <div className={`${prefixCls}-right`}>
          {
            headerRight
          }
          {
            showDownIcon
            && (
            <span
              className={`${prefixCls}-btn`}
              onClick={() => {
                if (isTransitioning) return;
                const box = contentRef.current;
                if (!show) {
                  onDownIconClick();
                }
                animation(box, `${prefixCls}-legacy`, !show, () => {
                  if (show) {
                    onDownIconClick();
                  }
                });
                // onDownIconClick();
              }}
            >
              {show ? '收起' : '展开'}
            </span>
            )
          }
        </div>
      </div>
      <div
        className={contentCls}
        ref={contentRef}
        onTransitionEnd={() => {
          setIsTransitioning(false);
        }}
      >
        {children}
      </div>
    </div>
  );
});

export default Index;
