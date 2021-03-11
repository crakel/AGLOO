"use strict";
// controller file

const User = require("../../models/User");
const Board = require("../../models/Board");
const Club = require("../../models/Club");

const output = {
    home: (req, res) => {
        res.render("./home/index");
    },

    login: (req, res) => {
        res.render("./home/login");
    },

    register: (req, res) => {
        res.render("./home/register");
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
};

const time = {
    getTime: async (req, res) => {
        req.body.id = req.query.id;
        const user = new User(req.body);
        const response = await user.getTime();
        return res.json(response);
    },

    insertTime: async (req, res) => {
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

const board = {
    feed: async (req, res) => {
        req.body.id = req.params.id;
        req.body.board = req.params.board;
        const board = new Board(req.body);
        const response = await board.feed();
        return res.json(response);
    },

    getBoard: async (req, res) => {
        req.body.club_id = req.params.club_id;
        req.body.board = req.params.board;
        console.log(req.body);
        const board = new Board(req.body);
        const response = await board.getBoard();
        // res.render("./home/list", { title: req.body.board , rows: response });
        return res.json(response);
    },

    readPost: async (req, res) => {
        req.body.board = req.params.board;
		req.body.idx = req.params.idx;
        const board = new Board(req.body);
        const response = await board.readPost();
		// res.render("./home/read", { title: response.title, rows: response });
        return res.json(response);
    },

    writePost: async (req, res) => {
        req.body.club_id = req.params.club_id;
        req.body.board = req.params.board;
        const board = new Board(req.body);
        const response = await board.writePost();
        return res.json(response);
    },

    editPost: async (req, res) => {
        req.body.board = req.params.board;
        req.body.idx = req.params.idx;
        const board = new Board(req.body);
        const response = await board.editPost();
        return res.json(response);
    },
    
    delPost: async (req, res) => {
        req.body.board = req.params.board;
        req.body.idx = req.params.idx;
        const board = new Board(req.body);
        const response = await board.delPost();
        return res.json(response);
    },

    readCmnt: async (req, res) => {
        req.body.board = req.params.board;
		req.body.idx = req.params.idx;
        const board = new Board(req.body);
        const response = await board.readCmnt();
        return res.json(response);
    },

    writeCmnt: async (req, res) => {
        req.body.board = req.params.board;
        req.body.board_idx = req.params.board_idx;
        const board = new Board(req.body);
        const response = await board.writeCmnt();
        return res.json(response);
    },

    editCmnt: async (req, res) => {
        req.body.board = req.params.board;
        req.body.idx = req.params.idx;
        const board = new Board(req.body);
        const response = await board.editCmnt();
        return res.json(response);
    },
    
    delCmnt: async (req, res) => {
        req.body.board = req.params.board;
        req.body.idx = req.params.idx;
        const board = new Board(req.body);
        const response = await board.delCmnt();
        return res.json(response);
    },
};

const club = {
    home: async (req, res) => {
        const club = new Club(req.params.club_id);
        const response = await club.home();
        return res.json(response);
    },

    member: async (req, res) => {
        const club = new Club(req.params.club_id);
        const response = await club.member();
        return res.json(response);
    },

    allClub: async (req, res) => {
        const club = new Club();
        const response = await club.allClub();
        return res.json(response);
    },

    myClub: async (req, res) => {
        const club = new Club(req.params.id);
        const response = await club.myClub();
        return res.json(response);
    },

    search: async (req, res) => {
        const club = new Club(req.query.club_name);
        const response = await club.search();
        return res.json(response);
    },

    create: async (req, res) => {
        console.log(req.file);
        if (req.file) {
            req.body.img = '/upload/club/' + req.file.filename;
        }
        else {
            req.body.img = '/upload/default.png';
        }
        req.body = JSON.parse(JSON.stringify(req.body));
        const club = new Club(req.body);
        const response = await club.create();
        return res.json(response);
    },

    edit: async (req, res) => {
        console.log(req.file);
        if (req.file) {
            req.body.img = '/upload/club/' + req.file.filename;
        }
        else {
            req.body.img = '/upload/default.png';
        }
        req.body = JSON.parse(JSON.stringify(req.body));
        const club = new Club(req.body);
        const response = await club.edit();
        return res.json(response);
    },
    
    delete: async (req, res) => {
        const club = new Club(req.params.club_id);
        const response = await club.delete();
        return res.json(response);
    },

    creator: async (req, res) => {
        const club = new Club(req.body);
        const response = await club.creator();
        return res.json(response);
    },

    join: async (req, res) => {
        const club = new Club(req.body);
        const response = await club.join();
        return res.json(response);
    },
    
    unjoin: async (req, res) => {
        const club = new Club(req.body);
        const response = await club.unjoin();
        return res.json(response);
    },
    
    isMember: async (req, res) => {
        req.body.club_id = req.params.club_id;
        req.body.id = req.params.id;
        const club = new Club(req.body);
        const response = await club.isMember();
        return res.json(response);
    },

    time: async (req, res) => {
        const club = new Club(req.body);
        const response = await club.time();
        return res.json(response);
    },
};
// object key 하나만 입력 -> 키와 같은 value로 넣어줌 (ES6)
module.exports = {
    output,
    process,
    time,
    board,
    club,
};
