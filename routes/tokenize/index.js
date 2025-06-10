const { tokenizerService, persistenceService } = require("../../services");

module.exports = async (fastify, opts) => {
	fastify.post("/",
		{
			schema: {
				body: { $ref: 'requestBodySchema' }
			}
		},
		async (request, reply) => {
			const data = request.body; 

		return data.map((item) => {
			const token = tokenizerService.tokenize(item);
			persistenceService.save(item, token);

			return token;
		})
		})
};
