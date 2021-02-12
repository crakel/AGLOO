"use strict";
// controller file

const User = require("../../models/User")


const output = {
	home: (req, res) => {
		// 렌더링 기능
		res.render("./home/index");
	},

	login: (req, res) => {
		res.render("./home/login");
	},

	register: (req, res) => {
		res.render("./home/register");
	},

	time: async (req, res) => {
		const user = new User(req.body);
		const response = await user.getTime();
		return res.json(response);
	}
};

const process = {
	login: async (req, res) => {
		const user = new User(req.body);
		const response = await user.login();
		return res.json(response);
	},
	register: async (req, res) => {
		const user = new User(req.body);
		const response = await user.register();
		return res.json(response);
	},

	time: async (req, res) => {
		const user = new User(req.body);
		const response = await user.saveTime();
		return res.json(response);
	}
};
// object key 하나만 입력 -> 키와 같은 value로 넣어줌 (ES6)
module.exports = {
	output,
	process,
};

