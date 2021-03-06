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

    async allClub() {
        try {
            const response = await ClubStorage.getAllClub();
            return response;
        } catch (err) {
            return { success: false, msg: "전체 동아리 조회 실패" };
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
            return response;
        } catch (err) {
            return { success: false, msg: "내 동아리 조회 실패" };
        }
    }

    async search() {
        const client = this.body;
        try {
            const response = await ClubStorage.searchClub(client);
            return response;
        } catch (err) {
            return { success: false, msg: "동아리 검색 실패" };
        }
    }

    async create() {
        const client = this.body;
        try {
            const response = await ClubStorage.insertClub(client);
            return response;
        } catch (err) {
            return { success: false, msg: "동아리 생성 실패" };
        }
    }

    async edit() {
        const client = this.body;
        try {
            const response = await ClubStorage.updateClub(client);
            return response;
        } catch (err) {
            return { success: false, msg: "동아리 수정 실패" };
        }
    }

    async delete() {
        const client = this.body;
        try {
            const response = await ClubStorage.deleteClub(client);
            return response;
        } catch (err) {
            return { success: false, msg: "동아리 삭제 실패" };
        }
    }

    async creator() {
        const client = this.body;
        try {
            const search = await ClubStorage.searchClub(client.club_name);
            console.log(search);
            client.club_id = search.club_id;
            const response = await ClubStorage.creatorClub(client);
            return response;
        } catch (err) {
            return { success: false, msg: "동아리 관리자 권한 부여 실패" };
        }
    }

    async join() {
        const client = this.body;
        try {
            const response = await ClubStorage.joinClub(client);
            return response;
        } catch (err) {
            return { success: false, msg: "동아리 가입 실패" };
        }
    }

    async isMember() {
        const client = this.body;
        try {
            const response = await ClubStorage.isMember(client);
            return response;
        } catch (err) {
            return { success: false, msg: "동아리 가입 조회 실패" };
        }
    }
}

module.exports = Club;