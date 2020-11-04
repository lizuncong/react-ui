import React from 'react';
import classNames from 'classnames';
import compress from './compress';
import { prefixCls, getFileUrl } from './utils';
import Add from './add';
import Image from './image';
import './style';

class Upload extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      fileObjs: [], // item { originFile, compressBase64, compressFile }
    };
  }

  componentDidMount() {
    const { onRef } = this.props;
    if (onRef) {
      onRef(this);
    }
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

  onInputChange(files) {
    const { fileObjs } = this.state;
    const { onChange, maxSize } = this.props;
    Object.keys(files).forEach((key) => {
      const file = files[key];

      // 验证图片格式
      const parts = file.name.split('.');
      const type = parts[parts.length - 1];
      const acceptTypes = ['png', 'jpg', 'jpeg'];
      if (acceptTypes.indexOf(type) === -1) {
        alert(`请上传${acceptTypes.join('，')}格式的图片！`);
        return;
      }

      file.url = getFileUrl(file);
      file.compressing = true; // 压缩状态，开始压缩

      const fileObj = { originFile: file, compressBase64: null, compressFile: null };
      fileObjs.push(fileObj);

      // 压缩图片的方法, maxSize单位为kb
      compress(file, maxSize || 200).then((res) => {
        this.compressCallBack(file, fileObj, res);
      }, (err) => {
        // 压缩失败，则返回原图片的信息
        this.compressCallBack(file, fileObj, err);
      });
    });

    this.setState({ fileObjs: [...fileObjs] });
    if (onChange) {
      onChange(fileObjs);
    }
  }

  // 暴露给父组件调用的添加图片方法
  addFile(file) {
    const { fileObjs } = this.state;
    const { maxLength } = this.props;
    if (fileObjs.length < maxLength) {
      this.onInputChange({
        0: file,
      });
    }
  }

  render() {
    const { fileObjs } = this.state;
    const { onChange, maxLength, className } = this.props;
    const compressCls = classNames(
      prefixCls,
      className,
    );
    return (
      <div
        className={compressCls}
      >
        <Add
          hidden={maxLength && fileObjs.length > maxLength - 1}
          onFileSelected={this.onInputChange}
        />
        {
          fileObjs.map((fileObj, index) => (
            <Image
              key={index}
              isCompressing={fileObj.originFile.compressing}
              src={fileObj.compressBase64 || fileObj.originFile.url}
              onDelete={() => {
                fileObjs.splice(index, 1);
                this.setState({
                  fileObjs: [...fileObjs],
                });
                if (onChange) {
                  onChange(fileObjs);
                }
              }}
            />
          ))
        }
      </div>
    );
  }
}

export default Upload;
