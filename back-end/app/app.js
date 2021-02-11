// const http = require("http");
// const app = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//     if (req.url === "/") {
//         res.end("여기는 루트 입니다.");
//     } else if (req.url === "/login") {
//         res.end("여기는 로그인 화면입니다.");
//     }
// });

// app.listen(3001, () => {
//     console.log("http로 가동된 서버입니다.");
// });

// MVC 패턴 
// app.js main file
"use strict";

// 모듈
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = 3000;
// 라우팅 
const home = require("./src/routes/home");
// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs"); // HTML과 비슷

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// URL 한글, 공백 문자 인식 해결
app.use("/", home); // use -> 미들 웨어를 등록해주는 메서드.
app.use(express.static(`${__dirname}/src/public`)) // 정적 경로 추가 
// dirname -> 현재 위치 

module.exports = app;

// npm init -y(자동완성) -> package.json 생
