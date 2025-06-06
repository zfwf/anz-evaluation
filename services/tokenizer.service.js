const { createHash } = require("node:crypto");

const { HASH_ALGORITHM } = require("./constants");

module.exports = {
	tokenize: (input) => {
		return createHash(HASH_ALGORITHM).update(input).digest("hex");
	},
};
