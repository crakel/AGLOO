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
            const user = await UserStorage.getUserInfo("qq");
            console.log(user)
            const response = await ClubStorage.getClubInfo(client);
            return response;
        } catch (err) {
            return { success: false, msg: "동아리 페이지 조희 실패" };
        }
    }
    
    async member() {
        const client = this.body;
        try {
            let member = await ClubStorage.getClubMember(client);
            console.log(member[0].id);
            let response = [];
            for (let i =0; i < member.length; i++) {
                const info = await UserStorage.getUserInfo(member[i].id);
                response.push(info);
            }
            console.log(response);
            return response;
        } catch (err) {
            return { success: false, msg: "동아리 회원 조희 실패" };
        }
    }
    
}

module.exports = Club;