"use strict";

const bcryptjs = require("bcryptjs");
const UserStorage = require("./UserStorage");
const Time = require("./Time");
const jwt = require("jsonwebtoken");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;
        console.log(client);
        
        try {
            const { id, pw } = await UserStorage.getLoginInfo(client.id);
            
            const token = jwt.sign({
                id: id
            },
            process.env.SECRET, {
                expiresIn: "1m"
            })

            
            const pw_sync = bcryptjs.compareSync(client.pw, pw);
            // await 으로 promise를 반환하는 데이터를 다 받을때까지 기다림
            // await은 async함수 안에서만 사용 가능
            // async await 함수는 자체적으로 promise를 반환한다
            if (id) {
                if (id === client.id && pw_sync) {
                    console.log("로그인성공");
                    return { success: true, token: token};
                }
                console.log("비밀번호가 틀렸습니다");
                return { success: false, msg: "비밀번호가 틀렸습니다" };
            }
            console.log("존재하지 않는 아이디입니다.");
            return { success: false, msg: "존재하지 않는 아이디입니다." };
        } catch (err) {
            return { success: false, msg: "에러" };
        }
    }

    async register() {
        const client = this.body;
        try {
            console.log(client);
            const response = await UserStorage.insert(client);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    }

    async getTime() {
        const client = this.body;
        try {
            const response = await Time.get(client.id);
            return response;
        } catch (err) {
            return { success: false, msg: "시간표 조회 실패" };
        }
    }

    async insertTime() {
        const client = this.body;
        try {
            const response = await Time.insert(client);
            return response;
        } catch (err) {
            return { success: false, msg: "시간표 최초 저장 실패" };
        }
    }

    async updateTime() {
        const client = this.body;
        try {
            const response = await Time.update(client);
            return response;
        } catch (err) {
            return { success: false, msg: "시간표 수정 실패" };
        }
    }

    async deleteTime() {
        const client = this.body;
        try {
            const response = await Time.delete(client.id);
            return response;
        } catch (err) {
            return { success: false, msg: "시간표 수정 실패" };
        }
    }
}

module.exports = User;
