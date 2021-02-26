"use strict";

const db = require("../config/db");

class BoardStorage {
    static async getPost(boardInfo) {
        return new Promise((resolve, reject) => {
            let query;
            if (boardInfo.board == 'free') {
                query = "SELECT free_id, title, writer, hit, DATE_FORMAT(updated, '%Y/%m/%d %T') as updated FROM free_board WHERE club_id =? ORDER BY free_id DESC;";
            }
            else if (boardInfo.board == "notice") {
                query = "SELECT notice_id, title, writer, hit, DATE_FORMAT(updated, '%Y/%m/%d %T') as updated FROM notice_board WHERE notice_id =? ORDER BY notice_id DESC;";
            }
            else if (boardInfo.board == "pic") {
                query = query = "SELECT pic_id, title, writer, hit, DATE_FORMAT(updated, '%Y/%m/%d %T') as updated pic_board WHERE club_id =? ORDER BY pic_id DESC;";
            }
            else if (boardInfo.board == "act") {
                query = query = "SELECT act_id, title, writer, hit, DATE_FORMAT(updated, '%Y/%m/%d %T') as updated FROM act_board WHERE club_id =? ORDER BY act_id DESC;";
            }
            db.query(query, boardInfo.club, (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
}
module.exports = BoardStorage;
