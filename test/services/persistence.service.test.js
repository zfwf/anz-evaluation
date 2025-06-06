const { test } = require("node:test");
const assert = require("node:assert");
const persistenceService = require("../../services/persistence.service");

test("persistence service can save data and token", async (t) => {
	const data = "data";
	const token = "token";
	const res = persistenceService.save(data, token);

	assert.equal(res.data, data);
	assert.equal(res.token, token);

	const dataTokens = persistenceService.find(token);
	assert.equal(dataTokens.length, 1);
	assert.equal(dataTokens[0].data, data);
	assert.equal(dataTokens[0].token, token);

	const data1 = "data1";
	const token1 = "token1";
	const res1 = persistenceService.save(data1, token1);

	assert.equal(res1.data, data1);
	assert.equal(res1.token, token1);

	const data1Token1 = persistenceService.find(token1);
	assert.equal(data1Token1.length, 1);
	assert.equal(data1Token1[0].data, data1);
	assert.equal(data1Token1[0].token, token1);
});
