module.exports = function(app) {
	var controller = require('../controllers/counter_controller');

	app.route('/field')
		.get(controller.ListAllField)

	app.route('/field/:field_id')
		.get(controller.GetField)
		.put(controller.PutField)
};
