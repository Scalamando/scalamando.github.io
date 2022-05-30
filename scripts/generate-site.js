const glob = require("fast-glob");
const fs = require("fs-extra");

const WORKSPACE_ROUTES_ROOT = "./routes";

async function getAllPackages() {
	const packages = await glob("./routes/**/package.json", {
		ignore: ["./**/node_modules"],
	});

	const transformedPaths = packages.map((path) => ({
		buildPath: path.slice(0, -13).concat("/dist"),
		url: path
			.slice(WORKSPACE_ROUTES_ROOT.length, -"package.json".length)
			.replaceAll("/index", ""),
	}));

	return transformedPaths;
}

async function generateSite() {
	await fs.ensureDir("dist");

	const packages = await getAllPackages();

	for (const package of packages) {
		const targetDir = `./dist${package.url}`;
		await fs.ensureDir(targetDir);
		fs.copy(package.buildPath, targetDir);
	}
}

generateSite();

