const animation = (target, transitionClassName, show) => {
  let height;
  let requestAnimationFrameId;
  const activeClassName = `${transitionClassName}-active`;

  // 注册transitionend事件。
  target.endListener = (e) => {
    if (target.rcAnimTimeout) {
      clearTimeout(target.rcAnimTimeout);
      target.rcAnimTimeout = null;
    }

    target.classList.remove(transitionClassName);
    target.classList.remove(activeClassName);

    target.removeEventListener('transitionend', target.endListener, false);
    target.endListener = null;

    // 动画结束
    if (requestAnimationFrameId) {
      window.cancelAnimationFrame(requestAnimationFrameId);
    }
    target.style.height = '';
    target.style.opacity = '';
  };
  target.addEventListener('transitionend', target.endListener, false);

  // 动画开始
  console.log('show....', show, target.offsetHeight);
  if (!show) {
    target.style.height = `${target.offsetHeight}px`;
    target.style.opacity = '1';
  } else {
    // 展开时，拿到元素的高度，然后即刻设置高度为0
    height = target.offsetHeight;
    target.style.height = '0px';
    target.style.opacity = '0';
  }
  target.classList.add(transitionClassName);

  // 动画过程
  target.rcAnimTimeout = setTimeout(() => {
    target.rcAnimTimeout = null;
    target.classList.add(activeClassName);
    // setTimeout(active, 0);
    if (requestAnimationFrameId) {
      window.cancelAnimationFrame(requestAnimationFrameId);
    }
    requestAnimationFrameId = window.requestAnimationFrame(() => {
      target.style.height = `${show ? height : 0}px`;
      target.style.opacity = show ? '1' : '0';
    });
    // 30ms for firefox
  }, 30);
};

export default animation;
