import React from 'react';
import GroupItem from './form-item/group-item';
import GridContainer from './gridContainer';
import RenderFromItem from './renderFormItem';
import { prefixCls } from '../../utils';

class FormItems extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onFormItemChange = this.onFormItemChange.bind(this);
  }

  // 只有选择框，slide才有ops参数
  onFormItemChange(itemValue, formItem, ops) {
    const { onItemValueChange, defaultSearchValue, searchValue } = this.props;
    // 重置按钮
    if (formItem.type === 'resetBtn') {
      onItemValueChange(defaultSearchValue, formItem);
      return;
    }
    // 搜索按钮
    if (formItem.type === 'searchBtn') {
      onItemValueChange({ ...searchValue }, formItem);
      return;
    }
    const temp = {};
    // 删除值为undefined的键
    Object.keys(itemValue).forEach((key) => {
      if (itemValue[key] === undefined) {
        delete searchValue[key];
      } else {
        temp[key] = itemValue[key];
      }
    });
    const newValue = { ...searchValue, ...temp };
    onItemValueChange(newValue, formItem, ops);
  }

  render() {
    const {
      formItems,
      searchValue,
    } = this.props;

    return (
      <GridContainer
        onFormItemChange={this.onFormItemChange}
        itemCounts={formItems.length}
      >
        {
          formItems.map((formItem) => {
            let key = formItem.dataIndex;
            if (formItem.group && formItem.group[0]) {
              key = formItem.group[0].dataIndex;
            }
            return (
              <div
                key={key}
                className={`${prefixCls}-grid-item`}
              >
                { formItem.title && (<div className={`${prefixCls}-grid-item-left`}>{formItem.title}：</div>)}
                <div className={`${prefixCls}-grid-item-right`}>
                  {
                    formItem.type === 'group'
                      ? (
                        <GroupItem
                          group={formItem.group || []}
                          searchValue={searchValue}
                          onFormItemChange={this.onFormItemChange}
                        />
                      )
                      : (
                        <RenderFromItem
                          formItem={formItem}
                          searchValue={searchValue}
                          onFormItemChange={this.onFormItemChange}
                        />
                      )
                  }
                </div>
              </div>
            );
          })
         }
      </GridContainer>
    );
  }
}

export default FormItems;
