const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const mime = require("./mime").types;
const config = require("./config");

const PORT = 8000;

const server = http.createServer(function(request, response) {
  const pathname = url.parse(request.url).pathname;
  const realPath = "assets" + pathname;
  let ext = path.extname(realPath);
  ext = ext ? ext.slice(1) : "unknown";
  const contentType = mime[ext] || "text/plain";

	// 匹配某些格式文件，设置本地缓存协议
  if (ext.match(config.Expires.fileMatch)) {
    const expires = new Date();
    expires.setTime(expires.getTime() + config.Expires.maxAge * 1000);
    response.setHeader("Expires", expires.toUTCString());
    response.setHeader("Cache-Control", "max-age=" + config.Expires.maxAge);
	}
	
  fs.exists(realPath, function(exists) {
    if (!exists) {
      // 文件不存在的情况 404
      response.writeHead(404, {
        "Content-Type": contentType
      });

      response.write(
        "This request URL " + pathname + " was not found this server"
      );
      response.end();
    } else {
			// 文件存在
      fs.stat(realPath, function(err, stat) {
        const lastModified = stat.mtime.toUTCString();
        response.setHeader("Last-Modified", lastModified);
        if (
          request.headers["if-modified-since"] &&
          lastModified === request.headers["if-modified-since"]
        ) {
          // 文件未修改 304
          response.writeHead(304, "Not Modified");
          response.end();
        } else {
          // 文件可能被修改
          fs.readFile(realPath, "binary", function(err, file) {
            if (err) { // 服务器错误 500
              response.writeHead(500, {
                "Content-Type": contentType
              });
            } else { // 成功 200
              response.writeHead(200, {
                "Content-Type": contentType
              });
              response.write(file, "binary");
              response.end();
            }
          });
        }
      });
    }
  });
});
server.listen(PORT);
console.log("Server runing at port : " + PORT);
