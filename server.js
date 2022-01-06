var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // body-parser – POST 데이터 처리
var session = require('express-session');
var fs = require("fs"); // file open 용도

app.set('views', __dirname + '/views'); // html 위치 정의
app.set('view engine', 'ejs'); // html 렌더링할 때 ejs 엔진 사용하도록 설정
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// express session으로 cookie 저장
app.use(session({
 secret: '@#@$MYSIGN#@$#$', // cookie 임의 변조를 방지하기 위한 sign값
 resave: false, // 세션을 언제나 저장할지? default: false 권장
 saveUninitialized: true // 새로 생겼지만 전과 동일한 세션 저장 default : true 권장
}));

var router = require('./router/main')(app, fs);