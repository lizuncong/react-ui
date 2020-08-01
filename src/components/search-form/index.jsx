import React, {
  useState, useEffect, memo, useMemo, useCallback,
} from 'react';
import classNames from 'classnames';
import FormItems from './components/form';
import SearchResult from './components/search-result';
import './style';
import { prefixCls } from './utils';

// 转换数据，将formItem: [{ type: 'input', dataIndex: 'sku' }]转成
// { sku: { type: 'input', dataIndex: 'sku', ...rest} }
const transformData = (data = []) => {
  const mapObj = {};
  data.forEach((item) => {
    if (item.type === 'group') {
      (item.group || []).forEach((op) => {
        mapObj[op.dataIndex] = op;
      });
    } else {
      mapObj[item.dataIndex] = item;
    }
  });
  return mapObj;
};

const SearchForm = memo(({
  defaultSearchValue = {}, formItems = [], searchValue = {}, onSearchValueChange,
  className,
}) => {
  const [innerSearchValue, setInnerSearchValue] = useState(() => ({ ...defaultSearchValue }));
  // 用于保留选择框选择的那些选项，用于筛选结果中select选项的渲染, 结构：{ dataIndex: { value1: label1, value2: label2 }}
  const [selectedOptions, setSelectedOptions] = useState({});

  // mapObj用于搜索结果searchResult的展现
  const [mapObj, setMapObj] = useState(() => transformData(formItems));

  // 点击删除搜索结果回调
  const memoizedOnDelete = useCallback(
    (newValue, formItem) => {
      setInnerSearchValue(newValue);
      onSearchValueChange(newValue, formItem);
    },
    [],
  );

  // 搜索表单项(比如输入框，选择框等)值改变的回调
  const memoizedOnItemValueChange = useCallback((newValue, formItem, ops) => {
    setInnerSearchValue({ ...newValue });
    if (ops) {
      const temp = selectedOptions[formItem.dataIndex];
      selectedOptions[formItem.dataIndex] = { ...temp, ...ops };
      setSelectedOptions({ ...selectedOptions });
    }
    // autoSearch 自动搜索
    if (formItem.autoSearch && onSearchValueChange) {
      onSearchValueChange({ ...newValue }, formItem);
    }
  }, [selectedOptions]);

  // 过滤掉formItem的hidden属性为true的搜索框
  const formItemsFilter = useMemo(() => formItems.filter((item) => !item.hidden), [formItems]);

  useEffect(() => {
    const mapObjTemp = transformData(formItems);
    Object.keys(searchValue).forEach((key) => {
      const item = mapObjTemp[key];
      if (item && ['select', 'slide'].indexOf(item.type) > -1) {
        const temp = selectedOptions[key] || {};
        const obj = {};
        if (item.multiple) {
          searchValue[key].forEach((value) => {
            const findItem = (item.options || []).find((i) => i.value === value);
            obj[value] = findItem ? findItem.label : '没匹配到';
          });
          selectedOptions[key] = { ...temp, ...obj };
        } else {
          const findItem = (item.options || []).find((i) => i.value === searchValue[key]);
          obj[searchValue[key]] = findItem ? findItem.label : '没匹配到';
          selectedOptions[key] = { ...temp, ...obj };
        }
      }
    });
    setSelectedOptions({ ...selectedOptions });
    setMapObj(mapObjTemp);
  }, [formItems]);

  useEffect(() => {
    // 出于性能考虑，这里做个对比，只有innerSearchValue和searchValue不同，才更新innerSearchValue
    if (JSON.stringify(innerSearchValue) !== JSON.stringify(searchValue)) {
      setInnerSearchValue({ ...searchValue });
    }
  }, [searchValue]);

  const searchFormCls = classNames(
    prefixCls,
    className,
  );

  return (
    <div className={searchFormCls}>
      <FormItems
        defaultSearchValue={defaultSearchValue}
        formItems={formItemsFilter}
        searchValue={innerSearchValue}
        onItemValueChange={memoizedOnItemValueChange}
      />
      <SearchResult
        searchValue={searchValue}
        mapObj={mapObj}
        selectedOptions={selectedOptions}
        onDelete={memoizedOnDelete}
      />
    </div>
  );
});

export default SearchForm;
