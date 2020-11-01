import React, { memo } from 'react';

/**
 * 取剪切板数据中的图片
 */
export function getClipBoardImage(clipBoardData) {
  const { items } = clipBoardData;
  let fileBlob = '';
  for (let i = 0; i < items.length; i++) {
    if (items[i].kind === 'file' && items[i].type === 'image/png') {
      fileBlob = items[i].getAsFile();
      break;
    }
  }
  return fileBlob;
}

class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onPaste = this.onPaste.bind(this);
    this.state = {

    };
  }

  onPaste(e) {
    const { disabled, onPaste } = this.props;
    const image = getClipBoardImage(e.clipboardData);
    if (disabled || !image) return;
  }

  render() {
    const {
      children, disabled, onPaste,
    } = this.props;
    const { onFocus, tabIndex, onBlur } = children.props;
    return React.cloneElement(children, {
      tabIndex: tabIndex || '0', // 让不可聚焦的元素变得可聚焦
      // onMouseEnter: () => {
      //   console.log('mouseEnter....');
      // },
      // onMouseLeave: () => {
      //   console.log('mouseLeave...');
      // },
      onFocus: (e) => {
        if (onFocus) onFocus(e);
        console.log('装饰onFocuse...');
        window.addEventListener('paste', this.onPaste);
      },
      onBlur: (e) => {
        if (onBlur) onBlur(e);
        console.log('装饰onBlur...');
        window.removeEventListener('paste', this.onPaste);
      },
    });
  }
}

export default Index;
