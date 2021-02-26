"use strict";
// controller file

const User = require("../../models/User");
const Board = require("../../models/Board");

const output = {
    home: (req, res) => {
        // 렌더링 기능
        res.render("./home/index");
    },

    login: (req, res) => {
        res.render("./home/login");
    },

    register: (req, res) => {
        res.render("./home/register");
    },

    getTime: async (req, res) => {
        req.body.id = req.query.id;
        const user = new User(req.body);
        const response = await user.getTime();
        return res.json(response);
    },

    getBoard: async (req, res) => {
        req.body.club = req.params.club;
        req.body.board = req.params.board;
        console.log(req.body);
        const board = new Board(req.body);
        const response = await board.getBoard();
        res.render("./home/list", { title: req.body.board , rows: response });
        return res.json(response);
    },

    readPost: async (req, res) => {
        req.body.board = req.params.board;
		req.body.idx = req.params.idx;
        const user = new Board(req.body);
        const response = await user.readPost();
		res.render("./home/read", { title: response.title, rows: response });
        return res.json(response);
    },
};

const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },

    insertTime: async (req, res) => {
        // req.session ?
        const user = new User(req.body);
        const response = await user.insertTime();
        return res.json(response);
    },

    updateTime: async (req, res) => {
        const user = new User(req.body);
        const response = await user.updateTime();
        return res.json(response);
    },

    deleteTime: async (req, res) => {
        req.body.id = req.query.id;
        const user = new User(req.body);
        const response = await user.deleteTime();
        return res.json(response);
    },
};
// object key 하나만 입력 -> 키와 같은 value로 넣어줌 (ES6)
module.exports = {
    output,
    process,
};
