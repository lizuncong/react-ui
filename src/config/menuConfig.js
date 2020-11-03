const menuList = [
  {
    title: '组件库',
    menuId: '1000',
    url: '/components',
    children: [
      {
        title: 'demo',
        url: '/components/demo',
      },
      {
        title: 'Less高级用法学习',
        url: '/components/less',
      },
      {
        title: '搜索表单',
        url: '/components/search-form',
      },
      {
        title: '图片压缩',
        url: '/components/image-compress',
      },
      {
        title: '上拉加载',
        url: '/components/pull-refresh',
      },
      {
        title: 'Spin加载中',
        url: '/components/spin',
      },
      {
        title: '长列表虚拟滚动',
        url: '/components/virtual-scroll',
      },
      {
        title: '表格倒置',
        url: '/components/transform-table',
      },
      {
        title: '折叠面板',
        url: '/components/collapse',
      },
      {
        title: '图片加载失败重载',
        url: '/components/image',
      },
    ].map((child, index) => ({ ...child, menuId: index + 1000 })),
  },
];
export default menuList;
