module.exports = (app) => {
  app.get('/api/repeat-list', (req, res) => {
    const { count } = req.query;
    console.log('count.....req', count);
    setTimeout(() => {
      console.log('count.....res', count);
      res.json({
        code: 0,
        data: [1, 2].map((item, index) => ({
          title: `第${Number(count)}次请求的数据：${index + 1}`,
        })),
        count,
      });
    }, (10 - count) * 1000);
  });
  app.get('/api/list', (req, res) => {
    setTimeout(() => {
      res.json({
        code: 0,
        data: [1, 2].map((item) => ({
          title: `第${item}条数据`,
        })),
      });
    }, 5000);
  });
};
