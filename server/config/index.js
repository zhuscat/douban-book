import path from 'path';

// 担心 这里的设置不能打包到前端去，不然会泄漏密码之类的东西
const rootPath = path.join(__dirname, '../..');

export default {
  rootPath,
  publicPath: '/public',
  staticPath: '/public/static',
  port: 3000,
  title: '看豆瓣',
  db: {
    host: 'mongodb://localhost',
    port: 27017,
    name: 'test',
  },
};
