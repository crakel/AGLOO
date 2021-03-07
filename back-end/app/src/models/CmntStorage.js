"use strict";

const db = require("../config/db");
const UserStorage = require("./UserStorage");

class CmntStorage {
    static async getCmnt(postInfo) {
        return new Promise((resolve, reject) => {
            const query =
                "SELECT idx, id, writer, comment, DATE_FORMAT(created, '%Y/%m/%d %T') as created, DATE_FORMAT(updated, '%Y/%m/%d %T') as updated FROM ?? WHERE board_idx =? ORDER BY idx DESC;";
            db.query(query, [postInfo.board, postInfo.idx], (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    
    static async insertCmnt(cmntInfo) {
        return new Promise((resolve, reject) => {
            console.log(cmntInfo);
            const query =
                "INSERT INTO ?? (board_idx, id, writer, comment) VALUES (?, ?, ?, ?);";
            db.query(query, [cmntInfo.board, cmntInfo.board_idx, cmntInfo.id, cmntInfo.writer, cmntInfo.comment], (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }

    static async updateCmnt(cmntInfo) {
        return new Promise((resolve, reject) => {
            const query =
                "UPDATE ?? SET comment=? WHERE idx =?;";
            db.query(query, [cmntInfo.board, cmntInfo.comment, cmntInfo.idx], (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }

    static async deleteCmnt(cmntInfo) {
        return new Promise((resolve, reject) => {
            const query =
                "DELETE FROM ?? WHERE idx = ?;";
            db.query(query, [cmntInfo.board, cmntInfo.idx], (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }
}
module.exports = CmntStorage;
