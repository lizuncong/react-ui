import React from 'react';
import BtnItem from './form-item/btnItem';
import { prefixCls } from '../../utils';
/*
* 简单的网格布局容器
* */
class GridContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.itemMinWidth = 300; // 每一表单项最小的宽度
    this.gridRowHeight = 32; // 行高
    this.gridRowGap = 12;
    this.formItemContainerRef = React.createRef();
    this.handleResize = this.handleResize.bind(this);
    this.onMoreBtnClick = this.onMoreBtnClick.bind(this); // 点击更多按钮，展开搜索表单
    this.state = {
      gridRows: 1, // 网格布局的行数
      gridContainerHeight: '',
      show: false, // 更多
    };
  }

  componentDidMount() {
    this.computedGridRowAndHeight();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  // 计算网格的宽高
  computedGridRowAndHeight() {
    const { itemCounts } = this.props;
    const gridContainerWidth = this.formItemContainerRef.current.clientWidth;
    const columns = Math.floor(gridContainerWidth / this.itemMinWidth);
    const rows = Math.ceil((itemCounts + 1) / columns);
    const gridContainerHeight = (rows * this.gridRowHeight) + ((rows - 1) * this.gridRowGap);
    this.setState({
      gridRows: rows,
      gridContainerHeight,
    });
  }

  handleResize() {
    this.computedGridRowAndHeight();
  }

  onMoreBtnClick(show) {
    this.setState({
      show,
    });
  }

  render() {
    const { children, onFormItemChange } = this.props;
    const { gridRows, gridContainerHeight, show } = this.state;
    const gridStyle = {
      gridTemplateColumns: `repeat(auto-fill, minmax(${this.itemMinWidth}px, 1fr))`,
      gridTemplateRows: `${this.gridRowHeight}px`,
      gridRowGap: `${this.gridRowGap}px`,
    };
    if (gridContainerHeight) {
      gridStyle.height = `${show ? gridContainerHeight : this.gridRowHeight}px`;
    }

    return (
      <div
        className={`${prefixCls}-grid-container`}
        style={gridStyle}
        ref={this.formItemContainerRef}
      >
        {children}
        <BtnItem
          gridRows={gridRows}
          show={show}
          onMoreClick={this.onMoreBtnClick}
          onFormItemChange={onFormItemChange}
        />
      </div>
    );
  }
}

export default GridContainer;
