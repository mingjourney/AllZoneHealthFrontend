const fs = require('fs');
const dbPath = './db.json';

module.exports = (req, res) => {
  if (req.method === 'POST' && req.path === '/login') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const parsedBody = JSON.parse(body);
      const { loginMethod, password } = parsedBody;

      const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      const user = db.users.find(
        (user) => user[loginMethod] === parsedBody[loginMethod] && user.password === password
      );

      if (user) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true }));
      } else {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, message: '用户名或密码错误' }));
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: '未找到请求的资源' }));
  }
};
