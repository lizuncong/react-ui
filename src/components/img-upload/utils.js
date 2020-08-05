export const prefixCls = 'rui-img-compress';

// 获取到本地文件的url，主要用于选择图片后显示图片
export const getFileUrl = (file) => {
  let url;
  const agent = navigator.userAgent;
  if (agent.indexOf('MSIE') >= 1) {
    url = file.value;
  } else if (agent.indexOf('Firefox') > 0 || agent.indexOf('Chrome') > 0) {
    url = window.URL.createObjectURL(file);
  }
  return url;
};
