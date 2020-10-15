import Oath from "../src/index";
import { promisify } from "util";
import { readFile } from "fs";

const readFilePromise = promisify(readFile);

test("Get Result without promises", async () => {
	const promises = await Oath.all({
		twoPlusTwo: 2 + 2,
		getString: "Hack the planet",
	});
	expect(promises.twoPlusTwo).toBe(4);
	expect(promises.getString).toBe("Hack the planet");
});

test("Get Result with Promises", async () => {
	const promises = await Oath.all({
		twoPlusTwo: async () => Promise.resolve(2 + 2),
		getString: async () => Promise.resolve("Hack the planet"),
	});
	const sum = await promises.twoPlusTwo();
	const str = await promises.getString();
	expect(sum).toBe(4);
	expect(str).toBe("Hack the planet");
});

test("Get Result with Promises", async () => {
	const promises = await Oath.all({
		packageJson: readFilePromise("./package.json"),
	});
	const json = JSON.parse(promises.packageJson.toString());
	expect(json.name).toBe("oath");
});
