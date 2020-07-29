import React from 'react';
import CheckBox from '../check-box';
import SortBox from '../sort-box';
import './style';

const prefixCls = 'rui-search-form';

class OtherItems extends React.Component {
  onFormItemChange(itemValue, formItem) {
    const { onValueChange, value } = this.props;
    const newValue = { ...value, ...itemValue };
    onValueChange(newValue, formItem);
  }

  renderFormItems(formItem) {
    const { value } = this.props;
    let formItemView = '';
    switch (formItem.type) {
      case 'sort':
        formItemView = (
          <SortBox
            key={formItem.title}
            title={formItem.title}
            sortValues={formItem.sortValues}
            value={value[formItem.dataIndex]}
            onChange={(val) => {
              this.onFormItemChange({ [formItem.dataIndex]: val }, formItem);
            }}
            className={`${prefixCls}-other-item`}
          />
        );
        break;
      default:
        formItemView = (
          <CheckBox
            key={formItem.title}
            title={formItem.title}
            checkValue={formItem.checkValue}
            value={value[formItem.dataIndex]}
            onChange={(val) => {
              this.onFormItemChange({ [formItem.dataIndex]: val }, formItem);
            }}
            className={`${prefixCls}-other-item`}
          />
        );
    }

    return formItemView;
  }

  render() {
    const { otherItems } = this.props;
    if (!otherItems.length) return '';
    return (
      <div className={`${prefixCls}-other-item-container`}>
        {
            otherItems.map((formItem) => this.renderFormItems(formItem))
          }
      </div>
    );
  }
}

export default OtherItems;
