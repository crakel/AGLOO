"use strict";

const db = require("../config/db");
const UserStorage = require("./UserStorage");

class Time {
    // 시간표 불러오는 함수
    static getTimeInfo(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM schedule WHERE id = ?;";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }
    // 시간표 최초 저장하는 함수
    static async insert(timeInfo) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO schedule SET ?;";
            db.query(query, timeInfo, (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }
    // 시간표 수정하는 함수
    static async update(timeInfo) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE schedule SET a0=?, a1=?, a2=?, a3=?, a4=?, b0=?, b1=?, b2=?, b3=?, b4=?, c0=?, c1=?, c2=?, c3=?, c4=?, d0=?, d1=?, d2=?, d3=?, d4=?, e0=?, e1=?, e2=?, e3=?, e4=?, f0=?, f1=?, f2=?, f3=?, f4=?, g0=?, g1=?, g2=?, g3=?, g4=? WHERE id=?;"
            db.query(query,                
                [
                timeInfo.a0, timeInfo.a1, timeInfo.a2, timeInfo.a3, timeInfo.a4,
                timeInfo.b0, timeInfo.b1, timeInfo.b2, timeInfo.b3, timeInfo.b4,
                timeInfo.c0, timeInfo.c1, timeInfo.c2, timeInfo.c3, timeInfo.c4,
                timeInfo.d0, timeInfo.d1, timeInfo.d2, timeInfo.d3, timeInfo.d4,
                timeInfo.e0, timeInfo.e1, timeInfo.e2, timeInfo.e3, timeInfo.e4,
                timeInfo.f0, timeInfo.f1, timeInfo.f2, timeInfo.f3, timeInfo.f4,
                timeInfo.g0, timeInfo.g1, timeInfo.g2, timeInfo.g3, timeInfo.g4,
                timeInfo.id
                ], (err) => {
                    if (err) reject(`${err}`);
                    resolve({ success: true });
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM schedule WHERE id = ?;";
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }
}

module.exports = Time;