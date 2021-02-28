"use strict";

const express = require("express");
const multer = require("multer");
const upload = multer({ dest: '/upload' });
const router = express.Router();

const ctrl = require("./home.ctrl");
const auth = require("./auth");

// 테스트용 임시 프론트
router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

// 로그인, 회원가입 API
router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

// 토큰 인증 API
router.post("/auth", auth.auth);

// 시간표 API
router.get("/time", ctrl.time.getTime);
router.post("/time", ctrl.time.insertTime);
router.patch("/time", ctrl.time.updateTime);
router.delete("/time", ctrl.time.deleteTime);

// 게시판 API
router.get("/list/:club/:board/", ctrl.board.getBoard);
router.get("/read/:board/:idx", ctrl.board.readPost);

// 동아리 API
router.get("/club/:club", ctrl.club.home);
router.get("/club/:club/member", ctrl.club.member);
// router.get("/club/:club/join", ctrl.club.join);

// router.post("/club_img", upload.single('club_img'), ctrl.upload.clubImg);



module.exports = router;