var fs = require("fs");
var file = "./counter.db"

var sqlite3 = require("sqlite3").verbose();

exports.List = function(res) {
		let db = new sqlite3.Database(file, (err) => {
				if (err) {
						console.log(err.message)
				}
		});

		db.serialize(function() {
				db.run("CREATE TABLE IF NOT EXISTS counter (field TEXT PRIMARY KEY, count INTEGER NOT NULL, timestamp INTEGER NOT NULL)");

				db.all("SELECT * FROM counter", [], (err, rows) => {
						if (err) {
								throw err;
						}
						res.json({"message":"success", "data":rows})
				});
		});

		db.close();
};

exports.Get = function(field_id, res) {
		let db = new sqlite3.Database(file, (err) => {
				if (err) {
						console.log(err.message)
				}
		});

		db.serialize(function() {
				db.run("CREATE TABLE IF NOT EXISTS counter (field TEXT PRIMARY KEY, count INTEGER NOT NULL, timestamp INTEGER NOT NULL)");
				db.get("SELECT * FROM counter WHERE field=" + field_id, [], (err, row) => {
						if (err) {
								throw err;
						}
						res.json({"message":"success", "data":row})
				});
		});

		db.close();
};

exports.Put = function(field_id, cnt, res) {
		let db = new sqlite3.Database(file, (err) => {
				if (err) {
						console.log(err.message)
				}
		});

		db.serialize(function() {
				db.run("CREATE TABLE IF NOT EXISTS counter (field TEXT PRIMARY KEY, count INTEGER NOT NULL, timestamp INTEGER NOT NULL)");
				var sql = "INSERT OR IGNORE INTO counter (field, count, timestamp) VALUES (" + field_id + ", 0, " + Date.now() + ")";
				db.run(sql);
				sql = "UPDATE counter SET count = " + cnt + ", timestamp = " + Date.now() + " WHERE field=" + field_id;
				db.run(sql)
				res.json({"message":"success"})
		});

		db.close();
};
