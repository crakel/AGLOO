"use strict";

const db = require("../config/db");

class ClubStorage {
    static async getClubInfo(club_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM club WHERE club_id=?;";
            db.query(query, club_id, (err, data) => {
                if (err) reject(`${err}`);
                console.log(data[0]);
                resolve(data[0]);
            });
        });
    }

    static async getClubMember(club_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT id FROM participate WHERE club_id=?;";
            db.query(query, club_id, (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
}

module.exports = ClubStorage;
