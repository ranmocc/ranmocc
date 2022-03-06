const express = require('express');
const path = require('path');
const body_parser = require('body-parser');
const { resolve } = require('path/posix');
const { json } = require('body-parser');
const bodyParser = require('body-parser');
 
const app = express();
 
// //设置跨域访问------优秀的很
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
});

// 连接数据库
function Conn(){
	var mysql = require('mysql');
	var connection = mysql.createConnection({
	    host:'localhost',
	    user:'root',
	    password:'19991116cq',
	    database:'son'
	});
	
	connection.connect();
	console.log("mysql数据库连接成功...")
	return connection;
}
 
 // 使用express中间件用来解析json格式的请求体
app.use(body_parser.urlencoded({
  extended: false
}));


//服务器响应请求
// app.get('/',(req,res)=>{
// 	res.send("hellow my server");
// }) 

//test路由
// app.post('/test',(req,res)=>{
// 	res.json({insex:"hellow"});
// })
//html前台路由
app.post('/sousuo', function (req, res) {
  const conn = Conn();
  //测试可以接受到数据
//   var json =req.body;
  var json = req.body;
//   var temp = json[8];
//!!!精确到查询的关键字的文本格式。。。
  for(var i in json){
	  var temp = json[i];
  }

  //查询关键字为
  console.log("查询关键字为:");
  console.log(temp);
  //sql语句
  var sql = "select * from son.son_list where son_name regexp '"+temp+"'";//引入变量的sql查询，且防止sql注入
  //查询数据库
  var get_result = function(callback){
	conn.query(sql, queryres = function (error, result) {
		if(error){
			console.log(error);
			// resolve({
			// 	status:500,
			// 	result:null,
			// 	msg:'操作失败'
			// })
		}else{
			console.log("查询结果如下：");
			console.log(result);
			callback(JSON.stringify(result));
			// console.log(callback);
			// resolve({
			// 	tatus: 200,
			// 	result:str,
			// 	msg:'操作成功'
			// })
		}
		// conn.end();
	  })
  }

//取得数据库查询数据
  get_result(function(data){
    console.log(data);//查看结果
	console.log(typeof(data));//查看类型
	var dataobj = JSON.parse(data);
	// var dataobj = data;
	console.log(dataobj);//查看结果
	console.log(typeof(dataobj));//查看类型
	//返回数据
	res.json(dataobj);
	
})
//转换数据格式
//返回数据
// res.send("成功！");

//   res.send(JSON.stringify(result));
})

// 创建监听端口4000
app.listen(4000, () => {
  console.log('http://localhost:4000 监听中...');
})
