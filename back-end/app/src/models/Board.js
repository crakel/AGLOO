"use strict";

const { response } = require("express");
const BoardStorage = require("./BoardStorage");
const ClubStorage = require("./ClubStorage");
const CmntStorage = require("./CmntStorage");
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

    // 게시글 CRUD
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

    // 댓글 CRUD
    async readCmnt() {
        const client = this.body;
        try {
            const response = await CmntStorage.getCmnt(client);
            return response;
        } catch (err) {
            return { success: false, msg: "댓글 조회 실패" };
        }
    }

    async writeCmnt() {
        const client = this.body;
        try {
            const info = await UserStorage.getUserInfo(client.id);
            const writer = info.name; 
            client.writer = writer;
            const response = await CmntStorage.insertCmnt(client);
            return response;
        } catch (err) {
            return { success : false, msg: "댓글 작성 실패" };
        }
    }


    async editCmnt() {
        const client = this.body;
        try {
            const response = await CmntStorage.updateCmnt(client);
            return response;
        } catch (err) {
            return { success: false, msg: "댓글 수정 실패" };
        }
    }

    async delCmnt() {
        const client = this.body;
        try {
            const response = await CmntStorage.deleteCmnt(client);
            return response;
        } catch (err) {
            return { success: false, msg: "댓글 삭제 실패" };
        }
    }

    async feed() {
        const client = this.body;
        try {
            const myclub = await ClubStorage.getMyClub(client.id);
            client.myclub = myclub;
            const response = await BoardStorage.getFeed(client);
            for (let i = 0; i < response.length; i++) {
                const club_name = await ClubStorage.getClubName(response[i].club_id);
                response[i].club_name = club_name.club_name;
            }
            return response;
        } catch (err) {
            return { success: false, msg: "피드 조회 실패" };
        }
    }
}
module.exports = Board;
