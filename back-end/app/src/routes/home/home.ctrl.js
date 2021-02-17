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

	getTime: async (req, res) => {
		req.body.id = req.query.id;
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

	insertTime: async (req, res) => {
		// req.session ?
		const user = new User(req.body);
		const response = await user.insertTime();
		return res.json(response);
	},

	updateTime: async (req, res) => {
		const user = new User(req.body);
		const response = await user.updateTime();
		return res.json(response);
	},

	deleteTime: async (req, res) => {
		req.body.id = req.query.id;
		const user = new User(req.body);
		const response = await user.deleteTime();
		return res.json(response);
	}
};
// object key 하나만 입력 -> 키와 같은 value로 넣어줌 (ES6)
module.exports = {
	output,
	process,
};

