"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");
const auth = require("./auth");

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/time", ctrl.output.getTime);
router.get("/list/:club/:board/", ctrl.output.getBoard);
router.get("/read/:board/:idx", ctrl.output.readPost);

router.post("/auth", auth.auth);
router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/time", ctrl.process.insertTime);

router.patch("/time", ctrl.process.updateTime);
router.delete("/time", ctrl.process.deleteTime);

module.exports = router;