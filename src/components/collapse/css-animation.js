const cssAnimation = (node, transitionName, { end, start, active }) => {
  const className = transitionName;
  const activeClassName = `${transitionName}-active`;

  if (node.rcEndListener) {
    node.rcEndListener();
  }

  node.rcEndListener = (e) => {
    if (e && e.target !== node) {
      return;
    }

    if (node.rcAnimTimeout) {
      clearTimeout(node.rcAnimTimeout);
      node.rcAnimTimeout = null;
    }

    node.classList.remove(className);
    node.classList.remove(activeClassName);

    node.removeEventListener('transitionend', node.rcEndListener, false);
    node.rcEndListener = null;

    // Usually this optional end is used for informing an owner of
    // a leave animation and telling it to remove the child.
    if (end) {
      end();
    }
  };

  node.addEventListener('transitionend', node.rcEndListener, false);
  if (start) {
    start();
  }
  node.classList.add(className);

  node.rcAnimTimeout = setTimeout(() => {
    node.rcAnimTimeout = null;
    node.classList.add(activeClassName);
    if (active) {
      setTimeout(active, 0);
    }
    // 30ms for firefox
  }, 30);

  return {
    stop() {
      if (node.rcEndListener) {
        node.rcEndListener();
      }
    },
  };
};

export default cssAnimation;
