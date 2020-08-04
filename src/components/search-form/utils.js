export const prefixCls = 'rui-search-form';

// 转换数据，将数组转成以dataIndex为键值的对象，比如：
// 将formItem: [{ type: 'input', dataIndex: 'sku' }, { type: 'select', dataIndex: 'test1'}]转成
// { sku: { type: 'input', dataIndex: 'sku'}, test1: { type: 'select', dataIndex: 'test1'} }
export const transformData = (data = []) => {
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
