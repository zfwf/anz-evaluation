const { test } = require("node:test");
const assert = require("node:assert");
const tokenizerService = require("../../services/tokenizer.service");

test("tokenizer service produce tokens correctly", async (t) => {
	const token = tokenizerService.tokenize("4111-1111-1111-1111");

	assert.equal(
		token,
		"b3f846b293cec081f0740bdaaecbea387754943b9e2ff6d83b8b459d1bbb43ac",
	);
});
