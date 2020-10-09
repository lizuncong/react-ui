import React, {
  memo, useRef, useEffect,
  useLayoutEffect,
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
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const target = contentRef.current;
    if (!target.didMount) {
      // 模拟componentDidMount
      target.didMount = true;
    } else {
      // 模拟componentDidUpdate
      animation(target, `${prefixCls}-legacy`, show);
    }
  }, [show]);

  // 使用useEffect会闪烁
  // useEffect(() => {
  //   const target = contentRef.current;
  //   if (!target.didMount) {
  //     // 模拟componentDidMount
  //     target.didMount = true;
  //   } else {
  //     // 模拟componentDidUpdate
  //     animation(target, `${prefixCls}-legacy`, show);
  //   }
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
                onDownIconClick();
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
      >
        {children}
      </div>
    </div>
  );
});

export default Index;
