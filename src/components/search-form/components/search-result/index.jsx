import React, { memo } from 'react';
import RenderLabel from './renderLabel';
import { prefixCls } from '../../utils';

const Index = memo(({
  searchValue, mapObj, selectedOptions, onDelete,
}) => {
  const keys = Object.keys(searchValue);
  // 如keys为空，则直接返回
  if (!keys.length) return '';
  // 如果values全为空字符串，或者空数组，则不展示
  // validKeys存的是有值的键，如果值为数组，则数组长度不为0才有效。
  const startEndKey = ['Start', 'End'];
  const validKeys = keys.filter((key) => {
    if (searchValue[key] instanceof Array) {
      return searchValue[key].length;
    } if (key.indexOf(startEndKey[1]) > -1) {
      // 把'End'后缀的Key过滤掉，因为Start和End后缀的key成对出现的，只需保留Start后缀的就行
      return false;
    }
    return searchValue[key] !== undefined;
  });

  if (!validKeys.length) return '';
  return (
    <div
      className={`${prefixCls}-search-result`}
    >
      {
        validKeys
          .map((key) => (
            <RenderLabel
              key={key}
              formItem={mapObj[key.replace(startEndKey[0], '')]}
              selectedOptions={selectedOptions}
              onDelete={onDelete}
              searchValue={searchValue}
            />
          ))
      }
    </div>
  );
});

export default Index;
