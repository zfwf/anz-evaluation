const { persistenceService } = require("../../services");

module.exports = async (fastify, opts) => {
	fastify.post("/", {
		...opts,
		schema: {
			body: { $ref: 'requestBodySchema' }
		}
	}, async (request, reply) => {
		const tokens = request.body;
		if (!Array.isArray(tokens)) {
			reply
				.status(400)
				.send({ error: "Invalid input, expected an array of tokens" });
		}

		return tokens.map((token) => {
			const items = persistenceService.find(token);
			if (Array.isArray(items) && items.length === 0) {
				return null;
			}

			return items[0].data;
		});
	});
};
