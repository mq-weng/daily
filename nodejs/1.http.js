var http = require('http');
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<h1>Node.sn<h1>');
}).listen(3000);
 //  1
// var hello1 = require('./2.module');
// hello1.setName("huahua");

// var hello2 = require('./2.module');
// hello2.setName("xixi");

// hello1.getName();  // xixi ,由于require 只引一次

//   2
var hello = require('./2.module');
hello() // 这样直接把对象本身引过来了
