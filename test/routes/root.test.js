const { test } = require("node:test");
const assert = require("node:assert");
const { build } = require("../helper");

test("default root route", async (t) => {
	const app = await build(t);

	const res = await app.inject({
		url: "/",
	});
	assert.deepStrictEqual(JSON.parse(res.payload), { root: true });
});
