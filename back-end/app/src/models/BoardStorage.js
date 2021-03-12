"use strict";

const db = require("../config/db");

class BoardStorage {
    static async getPostList(boardInfo) {
        return new Promise((resolve, reject) => {
            const query =
                "SELECT idx, title, id, writer, img, hit, DATE_FORMAT(created, '%Y/%m/%d %T') as created, DATE_FORMAT(updated, '%Y/%m/%d %T') as updated FROM ?? WHERE club_id =? ORDER BY idx DESC;";
            db.query(query, [boardInfo.board, boardInfo.club_id], (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }

    static async getPost(postInfo) {
        return new Promise((resolve, reject) => {
            const query1 = "UPDATE ?? SET hit=hit+1 WHERE idx=?;";
            const query2 = "SELECT idx, title, img, content, id, writer, hit, DATE_FORMAT(created, '%Y/%m/%d %T') as created, DATE_FORMAT(updated, '%Y/%m/%d %T') as updated FROM ?? WHERE idx=?;";
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
    
    static async insertPost(postInfo) {
        return new Promise((resolve, reject) => {
            const query =
                "INSERT INTO ?? (title, club_id, id, writer, content, img) VALUES (?, ?, ?, ?, ?, ?);";
            db.query(query, [postInfo.board, postInfo.title, postInfo.club_id, postInfo.id, postInfo.writer, postInfo.content, postInfo.img], (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }

    static async updatePost(postInfo) {
        return new Promise((resolve, reject) => {
            const query =
                "UPDATE ?? SET title=?, content=?, img=? WHERE idx =?;";
            db.query(query, [postInfo.board, postInfo.title, postInfo.content, postInfo.img, postInfo.idx], (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }

    static async deletePost(postInfo) {
        return new Promise((resolve, reject) => {
            const query =
                "DELETE FROM ?? WHERE idx = ?;";
            db.query(query, [postInfo.board, postInfo.idx], (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }

    static async getFeed(feedInfo) {
        return new Promise(async (resolve, reject) => {
            let myclub_query = "";
            if (feedInfo.myclub.length == 0) {
                resolve({success: false, msg: "가입된 동아리가 없습니다"});
            }
            for (let i = 0; i < feedInfo.myclub.length; i++) {
                myclub_query += "club_id = " + String(feedInfo.myclub[i].club_id);
                if (i != feedInfo.myclub.length - 1) {
                    myclub_query += " OR ";
                }
            }
            // console.log(myclub_query);
            let query =
                "SELECT idx, club_id, id, writer, title, hit, DATE_FORMAT(created, '%Y/%m/%d %T') as created, DATE_FORMAT(updated, '%Y/%m/%d %T') as updated FROM ?? WHERE "
                + myclub_query + " ORDER BY idx DESC LIMIT 3;";
            
            db.query(query, feedInfo.board, (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
}
module.exports = BoardStorage;
