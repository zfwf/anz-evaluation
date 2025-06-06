const { test } = require("node:test");
const assert = require("node:assert");
const { build } = require("../helper");
const { persistenceService } = require("../../services");

test("/detokenize is loaded", async (t) => {
	const app = await build(t);

	const res = await app.inject({
		method: "POST",
		url: "/detokenize",
		payload: [],
	});

	assert.equal(res.statusCode, 200);
	const responseBody = JSON.parse(res.body);
	assert.equal(Array.isArray(responseBody), true);
	assert.equal(responseBody.length, 0);
});

test("/detokenize returns 400 if payload not an array", async (t) => {
	const app = await build(t);

	const res = await app.inject({
		method: "POST",
		url: "/detokenize",
		payload: {},
	});

	assert.equal(res.statusCode, 400);
});

test("/detokenize returns 404 for methods for GET", async (t) => {
	const app = await build(t);

	const res = await app.inject({
		method: "GET",
		url: "/tokenize",
	});

	assert.equal(res.statusCode, 404);
});

test("/detokenize returns original value from hash", async (t) => {
	// arrange
	persistenceService.save(
		"4111-1111-1111-1111",
		"b3f846b293cec081f0740bdaaecbea387754943b9e2ff6d83b8b459d1bbb43ac",
	);
	persistenceService.save(
		"4444-3333-2222-1111",
		"0f7dc9af51859b2b3f85150755d4296e36d5b7881bbba9120260e20cefc88b52",
	);
	persistenceService.save(
		"4444-1111-2222-3333",
		"9125724ec8da8f2b1c4d4cb487c23af2e60df6529cc4851bdf8bbd85bc65f709",
	);

	// act
	const app = await build(t);

	const res = await app.inject({
		method: "POST",
		url: "/detokenize",
		payload: [
			"b3f846b293cec081f0740bdaaecbea387754943b9e2ff6d83b8b459d1bbb43ac",
			"0f7dc9af51859b2b3f85150755d4296e36d5b7881bbba9120260e20cefc88b52",
			"9125724ec8da8f2b1c4d4cb487c23af2e60df6529cc4851bdf8bbd85bc65f709",
		],
	});

	// assert
	assert.equal(res.statusCode, 200);
	assert.deepEqual(JSON.parse(res.body), [
		"4111-1111-1111-1111",
		"4444-3333-2222-1111",
		"4444-1111-2222-3333",
	]);
});
