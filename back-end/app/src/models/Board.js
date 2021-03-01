"use strict";

const { response } = require("express");
const BoardStorage = require("./BoardStorage");
const UserStorage = require("./UserStorage");

class Board {
    constructor(body) {
        this.body = body;
    }

    async getBoard() {
        const client = this.body;
        try {
            const response = await BoardStorage.getPostList(client);
            return response;
        } catch (err) {
            return { success: false, msg: "게시판 조회 실패" };
        }
    }

    async readPost() {
        const client = this.body;
        try {
            const response = await BoardStorage.getPost(client);
            return response;
        } catch (err) {
            return { success: false, msg: "게시글 조회 실패" };
        }
    }

    async writePost() {
        const client = this.body;
        try {
            const info = await UserStorage.getUserInfo(client.id);
            const writer = info.name; 
            client.writer = writer;
            const response = await BoardStorage.insertPost(client);
            return response;
        } catch (err) {
            return { success : false, msg: "게시글 작성 실패" };
        }
    }


    async editPost() {
        const client = this.body;
        try {
            const response = await BoardStorage.updatePost(client);
            return response;
        } catch (err) {
            return { success: false, msg: "게시글 수정 실패" };
        }
    }

    async delPost() {
        const client = this.body;
        try {
            const response = await BoardStorage.deletePost(client);
            return response;
        } catch (err) {
            return { success: false, msg: "게시글 삭제 실패" };
        }
    }
}
module.exports = Board;
