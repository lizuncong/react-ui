import React from 'react';
import classNames from 'classnames';
import FormItems from './formItems';
import OtherItems from './otherItems';
import './style';

const prefixCls = 'rui-search-form';

class SearchForm extends React.Component {
  onValueChange(newValue, formItem) {
    const { onValueChange } = this.props;
    Object.keys(newValue).forEach((key) => {
      if (newValue[key] === '' || newValue[key] === undefined) {
        delete newValue[key];
      }
    });
    onValueChange(newValue, formItem);
  }

  render() {
    const {
      formItems = [], value, otherItems = [], className,
    } = this.props;
    const cls = classNames(
      prefixCls,
      className,
    );
    return (
      <div className={cls}>
        <FormItems
          formItems={formItems.filter((item) => !item.hidden)}
          value={value}
          onValueChange={(newValue, formItem) => this.onValueChange(newValue, formItem)}
        />
        <OtherItems
          otherItems={otherItems.filter((item) => !item.hidden)}
          value={value}
          onValueChange={(newValue, formItem) => this.onValueChange(newValue, formItem)}
        />
      </div>
    );
  }
}

export default SearchForm;
