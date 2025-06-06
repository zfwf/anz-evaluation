const { tokenizerService, persistenceService } = require("../../services");

module.exports = async (fastify, opts) => {
	fastify.post("/", async (request, reply) => {
		const data = request.body;
		if (!Array.isArray(data)) {
			reply
				.status(400)
				.send({ error: "Invalid input, expected an array of data" });
		}

		return data.map((item) => {
			const token = tokenizerService.tokenize(item);
			persistenceService.save(item, token);

			return token;
		});
	});
};
