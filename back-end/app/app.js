"use strict";

// 모듈
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
// 라우팅 
const home = require("./src/routes/home");
// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// URL 한글, 공백 문자 인식 해결
app.use("/", home);
app.use(express.static(`${__dirname}/src/public`)) // 정적 경로 추가 
// dirname -> 현재 위치 

module.exports = app;

// npm init -y(자동완성) -> package.json 생성
