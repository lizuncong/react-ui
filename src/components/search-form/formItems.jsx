import React from 'react';
import { Input, Select, Button } from 'antd';
import IconFont from '../IconFont';
import RangePicker from '../range-picker';
import InputRange from '../input-range';
import './style';

const { Option } = Select;

const prefixCls = 'rui-search-form';

class FormItems extends React.Component {
  constructor(props) {
    super(props);
    this.itemMinWidth = 300;
    this.gridRowHeight = 32;
    this.gridRowGap = 12;
    this.formItemContainer = React.createRef();
    this.handleResize = this.handleResize.bind(this);
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
    const { formItems } = this.props;
    const gridContainerWidth = this.formItemContainer.current.clientWidth;
    const columns = Math.floor(gridContainerWidth / this.itemMinWidth);
    const rows = Math.ceil((formItems.length + 1) / columns);
    const gridContainerHeight = rows * this.gridRowHeight + (rows - 1) * this.gridRowGap;
    this.setState({
      gridRows: rows,
      gridContainerHeight,
    });
  }

  handleResize() {
    this.computedGridRowAndHeight();
  }

  onFormItemChange(itemValue, formItem) {
    const { onValueChange, value } = this.props;
    const newValue = { ...value, ...itemValue };
    onValueChange(newValue, formItem);
  }

  renderFormItem(formItem) {
    const { value, onValueChange } = this.props;
    let formItemView = '';
    switch (formItem.type) {
      case 'select':
        formItemView = (
          <Select
            allowClear
            className={`${prefixCls}-grid-item-right`}
            value={value[formItem.dataIndex]}
            mode={formItem.mode}
            maxTagCount={1}
            onChange={(val) => {
              this.onFormItemChange({ [formItem.dataIndex]: val }, formItem);
            }}
          >
            {
              formItem.options && formItem.options.map((item) => (
                <Option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </Option>
              ))
            }
          </Select>
        );
        break;
      case 'dateRange':
        formItemView = (
          <RangePicker
            start={value[formItem.startIndex]}
            end={value[formItem.endIndex]}
            className={`${prefixCls}-grid-item-right`}
            ranges={formItem.ranges}
            onChange={(dateStrings) => {
              this.onFormItemChange({
                [formItem.startIndex]: dateStrings[0],
                [formItem.endIndex]: dateStrings[1],
              }, formItem);
            }}
          />
        );
        break;
      case 'inputRange':
        formItemView = (
          <InputRange
            className={`${prefixCls}-grid-item-right`}
            start={value[formItem.startIndex]}
            end={value[formItem.endIndex]}
            onChange={(inputValue, dataIndex) => {
              let obj = {
                [formItem.endIndex]: inputValue,
              };
              if (dataIndex === 'start') {
                obj = {
                  [formItem.startIndex]: inputValue,
                };
              }
              const valueObj = {
                [formItem.startIndex]: value[formItem.startIndex],
                [formItem.endIndex]: value[formItem.endIndex],
                ...obj,
              };
              this.onFormItemChange(valueObj, formItem);
            }}
          />
        );
        break;
      default:
        formItemView = (
          <Input
            className={`${prefixCls}-grid-item-right`}
            value={value[formItem.dataIndex]}
            placeholder="请输入订单号"
            onKeyDown={(e) => {
              // 回车键
              if (e.keyCode === 13) {
                onValueChange && onValueChange(value, { type: 'enterBtn' });
              }
            }}
            onChange={(e) => {
              const { value: val } = e.target;
              this.onFormItemChange({ [formItem.dataIndex]: val }, formItem);
            }}
          />
        );
    }

    return formItemView;
  }

  render() {
    const { formItems, onValueChange, value } = this.props;
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
        ref={this.formItemContainer}
      >
        {
            formItems.map((formItem) => (
              <div key={formItem.dataIndex || formItem.startIndex} className={`${prefixCls}-grid-item`}>
                <div className={`${prefixCls}-grid-item-left`}>{formItem.title}</div>：
                {this.renderFormItem(formItem)}
              </div>
            ))
          }
        <div className={`${prefixCls}-btn`}>
          {
              gridRows > 1
                ? (
                  <span
                    className={`${prefixCls}-more`}
                    onClick={() => {
                      this.setState({
                        show: !show,
                      });
                    }}
                  >
                    更多
                    <IconFont className={[`${prefixCls}-icon`, show && `${prefixCls}-up`].join(' ')} type="icon-Down" />
                  </span>
                )
                : ''
            }
          <Button
            type="primary"
            icon="search"
            className={`${prefixCls}-search`}
            onClick={() => {
              onValueChange && onValueChange(value, { type: 'searchBtn' });
            }}
          >
            搜索
          </Button>
          <Button
            type="primary"
            icon="reload"
            onClick={() => {
              onValueChange && onValueChange({}, { type: 'resetBtn' });
            }}
          >
            重置
          </Button>
        </div>
      </div>
    );
  }
}

export default FormItems;
