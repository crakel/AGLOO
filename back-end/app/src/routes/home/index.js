"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
router.get("/time", ctrl.output.getTime);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);
router.post("/time", ctrl.process.insertTime);

router.patch("/time", ctrl.process.updateTime);
router.delete("/time", ctrl.process.deleteTime);

module.exports = router;