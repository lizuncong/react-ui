export const prefixCls = 'rui-image';

export const copy = (text) => {
  const input = document.createElement('textarea');
  document.body.appendChild(input);
  input.value = text;
  input.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    console.log('复制成功');
  }
  document.body.removeChild(input);
};
