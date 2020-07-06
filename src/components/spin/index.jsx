import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style';

const Index = ({ className, size, tip }) => {
  const [spinning, setSpinning] = useState(false);
  const prefixCls = 'rui-spin';
  console.log('index...');
  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-spinning`]: spinning,
    },
    className,
  )
  return (
    <div>Spin加载中....</div>
  );
};

Index.propTypes = {
  className: PropTypes.string,
  spinning: PropTypes.bool,
  style: PropTypes.object,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  tip: PropTypes.string,
  delay: PropTypes.number,
  wrapperClassName: PropTypes.string,
  indicator: PropTypes.element,
};

export default Index;
