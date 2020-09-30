import React, {
  memo, useRef, useState, useEffect,
} from 'react';
import classNames from 'classnames';
import prefixCls from './utils';
import './style';

const Index = memo(({
  bodyCls,
  headerCls,
  className,
  show,
  showDownIcon,
  title,
  onDownIconClick,
  headerRight,
  children,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const box = contentRef.current;
    if (show && box.style.display === 'none') {
      box.style.display = '';
    }
  }, [show]);

  const cls = classNames(
    prefixCls,
    className,
  );
  return (
    <div className={cls}>
      <div className={classNames(`${prefixCls}-header`, headerCls)}>
        <div className={`${prefixCls}-left`}>{title}</div>
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
                console.log('isTransitioning...', isTransitioning);
                if (isTransitioning) return;
                console.log('btn...click...');
                setIsTransitioning(true);
                const box = contentRef.current;
                box.style.display = '';
                let height;
                if (show) {
                  box.style.height = `${box.offsetHeight}px`;
                } else {
                  height = box.offsetHeight;
                  box.style.height = 0;
                }
                setTimeout(() => {
                  box.style.height = `${!show ? height : 0}px`;
                  box.classList.add(`${prefixCls}-active`);
                }, 0);
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
        className={classNames(`${prefixCls}-body`, bodyCls)}
        ref={contentRef}
        onTransitionEnd={() => {
          console.log('onTransitionEnd....')
          setIsTransitioning(false);
          const box = contentRef.current;
          box.classList.remove(`${prefixCls}-active`);
          box.style.display = show ? '' : 'none';
          box.style.height = '';
        }}
      >
        {children}
      </div>
    </div>
  );
});

export default Index;
