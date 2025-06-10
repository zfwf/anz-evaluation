const path = require("node:path");
const AutoLoad = require("@fastify/autoload");

// Pass --options via CLI arguments in command to enable these options.
const options = {};

module.exports = async (fastify, opts) => {
	// Place here your custom code!

	// Do not touch the following lines

	// This loads all plugins defined in plugins
	// those should be support plugins that are reused
	// through your application
	fastify.register(AutoLoad, {
		dir: path.join(__dirname, "plugins"),
		options: Object.assign({}, opts),
	});

	// This loads all plugins defined in routes
	// define your routes in one of these
	fastify.register(AutoLoad, {
		dir: path.join(__dirname, "routes"),
		options: Object.assign({}, opts),
	});

	const requestBodySchema = {
		$id: 'requestBodySchema',
		type: "array",
		uniqueItems: true,
		// items: { type: "string" }, // doesn't work, need ajv config
		// minContains: 1, // doesn't work, need ajv config
		// maxContains: 10 // doesn't work, need ajv config
	};
	fastify.addSchema(requestBodySchema);
};

module.exports.options = options;
