"use strict";

const ClubStorage = require("./ClubStorage");
const UserStorage = require("./UserStorage");

class Club {
    constructor(body) {
        this.body = body;
    }

    async home() {
        const client = this.body;
        try {
            const response = await ClubStorage.getClubInfo(client);
            return response;
        } catch (err) {
            return { success: false, msg: "동아리 페이지 조회 실패" };
        }
    }
    
    async member() {
        const client = this.body;
        try {
            const member = await ClubStorage.getClubMember(client);
            const response = [];
            for (let i = 0; i < member.length; i++) {
                const info = await UserStorage.getUserInfo(member[i].id);
                response.push(info);
            }
            return response;
        } catch (err) {
            return { success: false, msg: "동아리 회원 조회 실패" };
        }
    }
    
    async myClub() {
        const client = this.body;
        try {
            const myclub = await ClubStorage.getMyClub(client)
            const response = [];
            for (let i = 0; i < myclub.length; i++) {
                const info = await ClubStorage.getClubImg(myclub[i].club_id);
                response.push(info)
            }
            console.log(response);
            return response;
        } catch (err) {
            return { success: false, msg: "내 동아리 조회 실패" };
        }
    }
}

module.exports = Club;