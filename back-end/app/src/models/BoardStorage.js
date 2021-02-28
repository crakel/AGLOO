"use strict";

const db = require("../config/db");

class BoardStorage {
    static async getPostList(boardInfo) {
        return new Promise((resolve, reject) => {
            const query =
                "SELECT idx, title, id, writer, hit, DATE_FORMAT(updated, '%Y/%m/%d %T') as updated FROM ?? WHERE club_id =? ORDER BY idx DESC;";
            db.query(query, [boardInfo.board, boardInfo.club], (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    static async getPost(postInfo) {
        return new Promise((resolve, reject) => {
            const query1 = "UPDATE ?? SET hit=hit+1 WHERE idx=?";
            const query2 = "SELECT idx, title, content, id, writer, hit, DATE_FORMAT(updated, '%Y/%m/%d %T') as updated FROM ?? WHERE idx=?;";
            db.query(query1, [postInfo.board, postInfo.idx], (err, data) => {
                if (err) reject(`${err}`);
            });
            
            db.query(query2, [postInfo.board, postInfo.idx], (err, data) => {
                if (err) reject(`${err}`);
                console.log(data[0]);
                resolve(data[0]);
            });
        });
    }
}
module.exports = BoardStorage;
