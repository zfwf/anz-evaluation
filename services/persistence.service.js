const loki = require("lokijs");

const db = new loki("anz");

const tokensCollection = db.addCollection("tokens", {
	indices: ["token"],
	unique: ["hash"],
});

module.exports = {
	save: (data, token) => tokensCollection.insert({ data, token }),

	find: (token) => tokensCollection.where((item) => item.token === token),
};
