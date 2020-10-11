import React, {
  memo, useRef, useLayoutEffect, useEffect,
  useState,
} from 'react';
import './demo.less';

const data = [];
for (let i = 0; i < 30; i++) {
  data.push(i);
}
const Index = memo(() => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState(1); // 1使用useEffect，2使用useLayoutEffect
  const contentRef = useRef(null);
  useEffect(() => {
    if (type !== 1) return;
    const target = contentRef.current;
    if (show) {
      target.style.height = 0;
      if (target.effectTimeoutId) {
        clearTimeout(target.effectTimeoutId);
      }
      target.effectTimeoutId = setTimeout(() => {
        target.style.height = '';
      }, 500);
    }
  }, [show, type]);

  useLayoutEffect(() => {
    if (type !== 2) return;
    const target = contentRef.current;
    if (show) {
      target.style.height = 0;
      if (target.layoutEffectTimeoutId) {
        clearTimeout(target.layoutEffectTimeoutId);
      }
      target.layoutEffectTimeoutId = setTimeout(() => {
        target.style.height = '';
      }, 500);
    }
  }, [show, type]);

  return (
    <div className="effect-container">
      <div>
        <div
          className={type === 1 ? 'highlight' : ''}
          onClick={() => { setType(1); }}
        >
          1.使用useEffect
        </div>
        <div
          className={type === 2 ? 'highlight' : ''}
          onClick={() => { setType(2); }}
        >
          2.使用useLayoutEffect
        </div>
      </div>
      <div className="header">
        <span>header</span>
        <span
          className="click"
          onClick={() => {
            setShow(!show);
          }}
        >
          { show ? '收起' : '展开'}
        </span>
      </div>
      <div className={['body', show && 'show'].join(' ')} ref={contentRef}>
        {data.map((item, index) => (
          <div key={item}>{`${index}、这是一段长文本`}</div>
        ))}
      </div>
    </div>
  );
});

export default Index;
