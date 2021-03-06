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
router.get("/list/:club_id/:board", ctrl.board.getBoard);
router.get("/post/:board/:idx", ctrl.board.readPost);
router.post("/post/:club_id/:board", ctrl.board.writePost);
router.patch("/post/:board/:idx", ctrl.board.editPost);
router.delete("/post/:board/:idx", ctrl.board.delPost);

router.get("/cmnt/:board/:idx", ctrl.board.readCmnt);
router.post("/cmnt/:board/:board_idx", ctrl.board.writePost);
router.patch("/cmnt/:board/:board_idx/:idx", ctrl.board.editPost);
router.delete("/cmnt/:board/:board_idx/:idx", ctrl.board.delPost);

// 동아리 API
router.get("/club/:club_id", ctrl.club.home);
router.get("/club/:club_id/member", ctrl.club.member);
router.get("/club", ctrl.club.allClub);
router.get("/myclub/:id", ctrl.club.myClub);
router.get("/search", ctrl.club.search);

router.post("/club", upload.single('img'), ctrl.club.create);
router.patch("/club", upload.single('img'), ctrl.club.edit);
router.delete("/club/:club_id", ctrl.club.delete);

router.post("/creator", ctrl.club.creator);
router.post("/join", ctrl.club.join);
router.get("/isMember/:club_id/:id", ctrl.club.isMember);


module.exports = router;