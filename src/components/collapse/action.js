const animation = (target, transitionClassName, show) => {
  let height;
  let requestAnimationFrameId;
  const activeClassName = `${transitionClassName}-active`;

  if (target.endListener) {
    target.endListener();
  }

  target.endListener = () => {
    if (target.animTimeout) {
      clearTimeout(target.animTimeout);
      target.animTimeout = null;
    }
    console.log('transition....end....');
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
    target.style.display = '';
  };
  target.addEventListener('transitionend', target.endListener, false);

  // 动画开始
  console.log('show....', show);
  if (!show) {
    target.style.display = 'block';
    target.style.height = `${target.offsetHeight}px`;
    target.style.opacity = '1';
  } else {
    height = target.offsetHeight;
    target.style.height = '0px';
    target.style.opacity = '0';
  }
  target.classList.add(transitionClassName);

  // 动画过程
  target.animTimeout = setTimeout(() => {
    target.animTimeout = null;
    target.classList.add(activeClassName);
    if (requestAnimationFrameId) {
      window.cancelAnimationFrame(requestAnimationFrameId);
    }
    requestAnimationFrameId = window.requestAnimationFrame(() => {
      target.style.height = `${show ? height : 0}px`;
      target.style.opacity = show ? '1' : '0';
    });
  }, 30);
};

export default animation;
