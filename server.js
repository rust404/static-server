const http = require("http");
const fs = require("fs");
const url = require("url");
const port = process.argv[2] || 8888;

const server = http.createServer(function (request, response) {
  const parsedUrl = url.parse(request.url, true);
  const pathWithQuery = request.url;
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;
  const method = request.method;

  response.statusCode = 200;
  // 默认首页
  const filePath = path === "/" ? "/index.html" : path;
  const index = filePath.lastIndexOf(".");
  // 后缀
  const suffix = filePath.substring(index);
  const fileTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
  };
  response.setHeader(
    "Content-Type",
    `${fileTypes[suffix] || "text/html"};charset=utf-8`
  );
  let content;
  try {
    content = fs.readFileSync(`./public${filePath}`);
  } catch (error) {
    content = "文件不存在";
    response.statusCode = 404;
  }
  response.write(content);
  response.end();
});

server.listen(port);
console.log(
  "监听 " + port + " 成功\n请在浏览器中打开 http://localhost:" + port
);
