"use strict";

const { response } = require("express");
const BoardStorage = require("./BoardStorage");

class Board {
    constructor(body) {
        this.body = body;
    }

    async getBoard() {
        const client = this.body;
        try {
            const response = await BoardStorage.getPost(client);
            return response;
        } catch (err) {
            return { success: false, msg: "게시판 조회 실패"};
        }
    }
}
module.exports = Board;
