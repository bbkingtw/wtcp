var express = require('express'), app = express();
var http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    log('good')
});



var cp = require('child_process')
var exec = cp.exec
//var bodyParser = require('body-parser')


//app.use(bodyParser.urlencoded({ extended: false }))

//app.use(bodyParser.json())

app.post('/',function(req,res){
  return res.render('index.jade')
  var cmd=req.body.cmd
  var ls = exec(cmd, function(err,stdout,stderr){
     res.render('output.jade',{
       err:err, stdout:stdout,   stderr:stderr
     })
  });  
})

app.get('/',function(req,res){
  return res.render('index.jade')
  var ls = exec('ls -lh /usr', function(err,stdout,stderr){
res.render('output.jade',{err:err, stdout:stdout, stderr:stderr})
  });
 
  ls.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
  });
 
  ls.on('close', function(code) {
    console.log('exited with code' + code);
  });
})

app.listen(8989)


