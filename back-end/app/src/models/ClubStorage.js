"use strict";

const db = require("../config/db");

class ClubStorage {
    static async getClubInfo(club_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM club WHERE club_id=?;";
            db.query(query, club_id, (err, data) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }

    static async getClubImg(club_id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT club_id, club_name, img FROM club WHERE club_id=?;";
            db.query(query, club_id, (err, data) => {
                if (err) reject(`${err}`);
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

    static async getAllClub() {
        return new Promise((resolve, reject) => {
            const query = "SELECT club_id, club_name, depart, img FROM club;";
            db.query(query, (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }
    
    static async getMyClub(id) {
        return new Promise((resolve, reject) => {
            const query = "SELECT club_id FROM participate WHERE id=?;";
            db.query(query, id, (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    }

    static async searchClub(club_name) {
        return new Promise((resolve, reject) => {
            const query = "SELECT club_id FROM club WHERE club_name=?;";
            db.query(query, club_name, (err, data) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }

    static async insertClub(club_info) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO club(club_name, depart, sort, img, locate, time, phone, insta, intro, memo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
            db.query(query, [club_info.club_name, club_info.depart, club_info.sort, club_info.img, club_info.locate, club_info.time, club_info.phone, club_info.insta, club_info.intro, club_info.memo], (err) => {
                if (err) reject(`${err}`);
                resolve({ success : true });
            });
        });
    }

    static async updateClub(club_info) {
        return new Promise((resolve, reject) => {
            const query = "UPDATE club SET img=?, locate=?, time=?, phone=?, insta=?, intro=?, memo=?);";
            db.query(query, [club_info.img, club_info.locate, club_info.time, club_info.phone, club_info.insta, club_info.intro, club_info.memo], (err) => {
                if (err) reject(`${err}`);
                resolve({ success : true });
            });
        });
    }

    static async deleteClub(club_id) {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM club WHERE club_id=?;";
            db.query(query, club_id, (err) => {
                if (err) reject(`${err}`);
                resolve({ success : true });
            });
        });
    }

    static async creatorClub(info) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO participate(club_id, id, manage) VALUES (?, ?, 1)";
            db.query(query, [info.club_id, info.id], (err) => {
                if (err) reject(`${err}`);
                resolve({ success : true });
            });
        });
    }

    static async joinClub(info) {
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO participate(club_id, id, manage) VALUES (?, ?, 0)";
            db.query(query, [info.club_id, info.id], (err) => {
                if (err) reject(`${err}`);
                resolve({ success : true });
            });
        });
    }

    static async isMember(info) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM participate WHERE club_id=? AND id=? AND manage=0;";
            db.query(query, [info.club_id, info.id], (err, data) => {
                if (err) reject(`${err}`);
                console.log(data)
                if (data[0]) resolve({ member : true });
                else resolve({ member: false });
            });
        });
    }
}

module.exports = ClubStorage;
