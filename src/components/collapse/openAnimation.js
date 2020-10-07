import cssAnimation from './css-animation';

function animate(node, show, done) {
  let height;
  let requestAnimationFrameId;
  return cssAnimation(node, 'rui-collapse-legacy', {
    start() {
      if (!show) {
        node.style.height = `${node.offsetHeight}px`;
        node.style.opacity = '1';
      } else {
        height = node.offsetHeight;
        node.style.height = '0px';
        node.style.opacity = '0';
      }
    },
    active() {
      if (requestAnimationFrameId) {
        window.cancelAnimationFrame(requestAnimationFrameId);
      }
      requestAnimationFrameId = window.requestAnimationFrame(() => {
        node.style.height = `${show ? height : 0}px`;
        node.style.opacity = show ? '1' : '0';
      });
    },
    end() {
      if (requestAnimationFrameId) {
        window.cancelAnimationFrame(requestAnimationFrameId);
      }
      node.style.height = '';
      node.style.opacity = '';
      done();
    },
  });
}

const animation = {
  enter(node, done) {
    return animate(node, true, done);
  },
  leave(node, done) {
    return animate(node, false, done);
  },
  appear(node, done) {
    return animate(node, true, done);
  },
};

export default animation;
