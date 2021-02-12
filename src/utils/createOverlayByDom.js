const loadingUrl = 'https://media.number-7.cn/ebike-h5/static/images/common/loading.gif';

const showDomLoading = (domId) => {
  const dom = document.getElementById(domId);
  if (!dom) return;
  const transformValue = window.getComputedStyle(dom).getPropertyValue('transform');
  if (transformValue === 'none') {
    dom.classList.add('requestLoadingOverlay');
  }
  const domOverlay = document.createElement('div');
  domOverlay.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  domOverlay.id = `${domId}-overlay`;
  domOverlay.classList.add('domOverlay');
  const loadingImg = document.createElement('img');
  loadingImg.src = loadingUrl;
  loadingImg.classList.add('loadingImg');
  domOverlay.appendChild(loadingImg);
  dom.appendChild(domOverlay);
};

const removeDomLoading = (domId) => {
  const dom = document.getElementById(domId);
  if (!dom) return;
  const { transitionDelay, transitionDuration } = window.getComputedStyle(dom);
  const transitionTimes = parseFloat(transitionDelay) + parseFloat(transitionDuration);
  dom.classList.add('unsetTransition');
  dom.classList.remove('requestLoadingOverlay');
  const domOverlay = document.getElementById(`${domId}-overlay`);
  if (!domOverlay) return;
  dom.removeChild(domOverlay);
  setTimeout(() => {
    dom.classList.remove('unsetTransition');
  }, transitionTimes * 1000);
};

export { showDomLoading, removeDomLoading };
