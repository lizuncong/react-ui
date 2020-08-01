import React from 'react';
import classNames from 'classnames';
import Icon from '../IconFont';
import compress from './compress';
import './style';

class Upload extends React.PureComponent {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      fileObjs: [], // item { originFile, compressBase64, compressFile }
    };
  }

  getFileUrl(file) {
    let url;
    const agent = navigator.userAgent;
    if (agent.indexOf('MSIE') >= 1) {
      url = file.value;
    } else if (agent.indexOf('Firefox') > 0 || agent.indexOf('Chrome') > 0) {
      url = window.URL.createObjectURL(file);
    }
    return url;
  }

  compressCallBack(file, fileObj, result) {
    const { fileObjs } = this.state;
    const { onChange } = this.props;
    file.compressing = false; // 压缩完成
    fileObj.compressBase64 = result.compressBase64;
    fileObj.compressFile = result.compressFile;
    this.setState({ fileObjs: [...fileObjs] });
    if (onChange) {
      onChange(fileObjs);
    }
    if (fileObjs.length && fileObjs.every((fileObjItem) => fileObjItem.compressBase64)) {
      console.log('全部压缩完成', fileObjs);
    }
  }

  onInputChange(e) {
    const { fileObjs } = this.state;
    const { onChange, compressStatus } = this.props;
    Object.keys(e.target.files).forEach((key) => {
      const file = e.target.files[key];

      // 验证图片格式
      const parts = file.name.split('.');
      const type = parts[parts.length - 1];
      if (type !== 'png' && type !== 'jpg' && type !== 'jpeg') {
        console.warn('请上传png,jpg,jpeg格式的图片！');
        e.target.value = '';
        return;
      }

      file.url = this.getFileUrl(file);
      file.compressing = true; // 压缩状态，开始压缩

      const fileObj = { originFile: file, compressBase64: null, compressFile: null };
      fileObjs.push(fileObj);

      // 压缩图片的方法, maxSize单位为kb
      compress(file, 200).then((res) => {
        this.compressCallBack(file, fileObj, res);
      }, (err) => {
        // 压缩失败，则返回原图片的信息
        this.compressCallBack(file, fileObj, err);
      });
    });

    this.setState({ fileObjs: [...fileObjs] });
    if (onChange && compressStatus) {
      onChange(fileObjs);
    }
    e.target.value = '';
  }

  render() {
    const { fileObjs } = this.state;
    const { onChange, maxLength, className } = this.props;
    const prefixCls = 'rui-img-compress';
    const compressCls = classNames(
      prefixCls,
      className,
    );
    return (
      <div
        className={compressCls}
      >
        {
          !maxLength || fileObjs.length < maxLength
            ? (
              <div className={`${prefixCls}-item`}>
                <div
                  className={`${prefixCls}-input-container`}
                  onClick={() => {
                    this.fileInput.current.click();
                  }}
                >
                  <span className={`${prefixCls}-upload-icon`}>+</span>
                  <input
                    className={`${prefixCls}-file-input`}
                    ref={this.fileInput}
                    type="file"
                    name="file"
                    multiple="multiple"
                    accept="image/*"
                    onChange={(e) => this.onInputChange(e)}
                  />
                </div>
              </div>
            )
            : ''
        }
        {
            fileObjs.map((fileObj, index) => (
              <div
                className={`${prefixCls}-item`}
                key={index}
              >
                <img
                  src={fileObj.compressBase64 ? fileObj.compressBase64 : fileObj.originFile.url}
                  className={classNames(`${prefixCls}-img`, {
                    [`${prefixCls}-filter`]: fileObj.originFile.compressing,
                  })}
                  alt=""
                />
                {
                    fileObj.originFile.compressing
                      ? (
                        <div className={`${prefixCls}-progress-container`}>
                          <div className={`${prefixCls}-progress`}>
                            <div className={`${prefixCls}-progress-highlight`} />
                          </div>
                        </div>
                      )
                      : (
                        <Icon
                          className={`${prefixCls}-delete`}
                          type="icon-Cancel"
                          onClick={() => {
                            console.log(fileObjs);
                            fileObjs.splice(index, 1);
                            this.setState({
                              fileObjs: [...fileObjs],
                            });
                            if (onChange) {
                              onChange(fileObjs);
                            }
                          }}
                        />
                      )
                  }
              </div>
            ))
          }
      </div>
    );
  }
}

export default Upload;
