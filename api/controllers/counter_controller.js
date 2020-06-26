var model = require("../models/counter_model.js")

exports.ListAllField = function(req, res) {
		model.List(res);
};

exports.GetField = function(req, res) {
		model.Get(req.params.field_id, res);
};

exports.PutField = function(req, res) {
		var errors = []

		if (!req.body.count) {
				errors.push("No count specified");
		}
		if (errors.length) {
				res.status(400).json({"error":errors.join(",")});
				return;
		}

		model.Put(req.params.field_id, req.body.count, res);
};
