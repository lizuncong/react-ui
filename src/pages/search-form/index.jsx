import React from 'react';
import SearchForm from 'components/search-form';
import styles from './index.module.less';

const defaultSearchValue = {
  test3: '1',
  test7Start: '2020-05-01',
  test7End: '2020-06-01',
  isFirstOrder: '1',
  // test4: ['1', '2'],
};
class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: defaultSearchValue,
    };
    this.formItems = [
      {
        type: 'group',
        group: [
          {
            title: '订单编号',
            type: 'input',
            dataIndex: 'orderNum',
            inputType: 'int', // 输入框只能输入整数
            maxLength: 13, // 整数，最大只能输入13个字符，不传默认输入任意长度的字符,
          },
          {
            title: '是否首单', // 可以输入任意字符
            dataIndex: 'isFirstOrder2',
            type: 'slide',
            options: [
              { label: '全部', value: '' },
              { label: '是', value: '1' },
              { label: '否', value: '0' },
            ],
          },
          {
            title: '设计款号',
            type: 'input',
            dataIndex: 'designCode',
          },
          {
            title: '检测单号',
            type: 'input',
            dataIndex: 'checkNum',
          },
          {
            title: 'group4',
            dataIndex: 'group4',
            type: 'select',
            // autoSearch: true, // 开启自动搜索，条件一改变就搜索
            options: [
              {
                label: '选项1',
                value: '1',
              },
              {
                label: '选项2',
                value: '2',
              },
              {
                label: '选项3',
                value: '3',
              },
            ],
          },
          {
            title: 'group5',
            dataIndex: 'group5',
            type: 'select',
            multiple: true, // 是否多选
            // autoSearch: true, // 开启自动搜索，条件一改变就搜索
            options: [
              {
                label: '选项1',
                value: '1',
              },
              {
                label: '选项2',
                value: '2',
              },
              {
                label: '选项3',
                value: '3',
              },
            ],
          },
          {
            title: '加工厂group6',
            type: 'searchSelect', // 远程搜索，不需要传options。
            dataIndex: 'group6',
            // autoSearch: true, // 开启自动搜索，条件一改变就搜索
            multiple: true,
            field: 'faQcSupplier',
          },
        ],
      },
      {
        title: '是否首单', // 可以输入任意字符
        dataIndex: 'isFirstOrder',
        type: 'slide',
        options: [
          { label: '全部', value: '' },
          { label: '是', value: '1' },
          { label: '否', value: '0' },
        ],
      },
      {
        title: '条件1', // 可以输入任意字符
        dataIndex: 'test1',
        type: 'input',
        maxLength: 13, // 整数，最大只能输入13个字符，不传默认输入任意长度的字符
      },
      {
        title: '条件2', // 可以输入任意字符
        dataIndex: 'test2',
        type: 'input',
        inputType: 'int', // 输入框只能输入整数
        maxLength: 13, // 整数，最大只能输入13个字符，不传默认输入任意长度的字符
      },
      {
        title: '条件3',
        dataIndex: 'test3',
        type: 'select',
        disabledClear: true, // 不能清空
        // autoSearch: true, // 开启自动搜索，条件一改变就搜索
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
          {
            label: '选项3',
            value: '3',
          },
        ],
      },
      {
        title: '条件4',
        dataIndex: 'test4',
        type: 'select',
        multiple: true, // 是否多选
        autoSearch: true, // 开启自动搜索，条件一改变就搜索
        options: [
          {
            label: '选项1',
            value: '1',
          },
          {
            label: '选项2',
            value: '2',
          },
          {
            label: '选项3',
            value: '3',
          },
        ],
      },
      {
        title: '加工厂',
        type: 'searchSelect', // 远程搜索，不需要传options。
        dataIndex: 'factoryIds',
        // autoSearch: true, // 开启自动搜索，条件一改变就搜索
        multiple: true,
        field: 'faQcSupplier',
      },
      {
        title: '工厂(单选)',
        type: 'searchSelect', // 远程搜索，不需要传options。
        dataIndex: 'factoryId2',
        // autoSearch: true, // 开启自动搜索，条件一改变就搜索
        field: 'faQcSupplier',
      },
      {
        title: '条件6',
        dataIndex: 'test6', // 日期范围的索引，会自动加上Start和End后缀，即test6Start和test6End
        type: 'datePicker',
        // autoSearch: true, // 开启自动搜索，条件一改变就搜索
        // 不传，就默认到天，传{ format: 'HH'}则到小时，{ format: 'HH:mm'}到分，{ format: 'HH:mm:ss' }到秒
        showTime: {
          format: 'HH:mm',
          defaultValue: true, // 是否设置默认的时分秒,
        },
        // format要和showTime保持一致
        format: 'YYYY-MM-DD HH:mm',
        ranges: 30, // 日期跨度，可以不传，传的话就只能选定ranges指定的日期跨度。
      },
      {
        title: '条件7',
        disabledClear: true, // 不能清空
        dataIndex: 'test7', // 日期范围的索引，会自动加上Start和End后缀，即test6Start和test6End
        type: 'datePicker',
      },
      // {
      //   title: '输入范围',
      //   startIndex: 'dayRangeStart',
      //   endIndex: 'dayRangeEnd',
      //   type: 'inputRange',
      // },
    ];
    this.onSearchValueChange = this.onSearchValueChange.bind(this);
  }

  onSearchValueChange(value, formItem) {
    this.setState({
      searchValue: value,
    });
  }

  render() {
    const { searchValue } = this.state;
    return (
      <div className={styles.container}>
        <div className="demo-title">上拉加载</div>
        <div className={styles.wrap}>
          <SearchForm
            formItems={this.formItems}
            defaultSearchValue={defaultSearchValue}
            searchValue={searchValue}
            onSearchValueChange={this.onSearchValueChange}
          />
          <div>
            searchValue: { JSON.stringify(searchValue)}
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
