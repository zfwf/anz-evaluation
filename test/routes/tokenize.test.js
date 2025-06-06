const { test } = require("node:test");
const assert = require("node:assert");
const { createHash } = require("node:crypto");

const { build } = require("../helper");

test("/tokenize is loaded", async (t) => {
	const app = await build(t);

	const res = await app.inject({
		method: "POST",
		url: "/tokenize",
		payload: [],
	});

	assert.equal(res.statusCode, 200);
	const responseBody = JSON.parse(res.body);
	assert.equal(Array.isArray(responseBody), true);
	assert.equal(responseBody.length, 0);
});

test("/tokenize returns 400 if payload not an array", async (t) => {
	const app = await build(t);

	const res = await app.inject({
		method: "POST",
		url: "/tokenize",
		payload: {},
	});

	assert.equal(res.statusCode, 400);
});

test("/tokenize returns 404 for methods for GET", async (t) => {
	const app = await build(t);

	const res = await app.inject({
		method: "GET",
		url: "/tokenize",
	});

	assert.equal(res.statusCode, 404);
});

test("/tokenize returns sha256 hash of payload", async (t) => {
	const app = await build(t);

	const res = await app.inject({
		method: "POST",
		url: "/tokenize",
		payload: [
			"4111-1111-1111-1111",
			"4444-3333-2222-1111",
			"4444-1111-2222-3333",
		],
	});

	assert.equal(res.statusCode, 200);
	const responseBody = JSON.parse(res.body);
	assert.deepEqual(responseBody, [
		"b3f846b293cec081f0740bdaaecbea387754943b9e2ff6d83b8b459d1bbb43ac", // sha256 of '4111-1111-1111-1111'
		"0f7dc9af51859b2b3f85150755d4296e36d5b7881bbba9120260e20cefc88b52", // sha256 of '4444-3333-2222-1111'
		"9125724ec8da8f2b1c4d4cb487c23af2e60df6529cc4851bdf8bbd85bc65f709", // sha256 of '4444-1111-2222-3333'
	]);
});
