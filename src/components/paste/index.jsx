import React from 'react';

/**
 * 监听粘贴事件的容器
 * */
class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onPaste = this.onPaste.bind(this);
    this.state = {
      isFocusing: false,
    };
  }

  onPaste(e) {
    const {
      disabled, onPaste,
    } = this.props;
    const { isFocusing } = this.state;
    if (!isFocusing || disabled) return;
    const files = e.clipboardData.files || [];
    let file;
    if (files.length) {
      file = files[0];
    }
    if (!file) return;
    onPaste(file);
  }

  render() {
    const {
      children,
    } = this.props;
    const { onFocus, tabIndex, onBlur } = children.props;
    return React.cloneElement(children, {
      tabIndex: tabIndex || '0', // 让不可聚焦的元素变得可聚焦
      onFocus: (e) => {
        if (onFocus) onFocus(e);
        this.setState({
          isFocusing: true,
        });
      },
      onBlur: (e) => {
        if (onBlur) onBlur(e);
        this.setState({
          isFocusing: false,
        });
      },
      onPaste: this.onPaste,
    });
  }
}

export default Index;
