"use strict";

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    console.log(req.body.token);
    const token = req.body.token;

    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded)
    if(decoded) {
        return res.json({ success: true, id: decoded.id})
    }

    else {
        return res.json({ success: false })
    }
}

module.exports = {
    auth,
};