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
router.get("/list/:club_id/:board/", ctrl.board.getBoard);
router.get("/read/:board/:idx", ctrl.board.readPost);
router.post("/write/:club_id/:board/", ctrl.board.writePost);
router.patch("/edit/:board/:idx", ctrl.board.editPost);
router.delete("/del/:board/:idx", ctrl.board.delPost);

// 동아리 API
router.get("/club/:club_id", ctrl.club.home);
router.get("/club/:club_id/member", ctrl.club.member);
router.get("/club/", ctrl.club.allClub);
router.get("/myclub/:id", ctrl.club.myClub);
router.get("/search", ctrl.club.search);
// router.get("/club/:club/join", ctrl.club.join);

// router.post("/club_img", upload.single('club_img'), ctrl.upload.clubImg);



module.exports = router;