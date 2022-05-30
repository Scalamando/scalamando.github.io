const { spawn } = require("child_process");
const glob = require("fast-glob");
const fs = require('fs-extra');

const buildProcess = spawn("pnpm", ["-r", "build"]);

buildProcess.on('error', (err) => console.error(err));

buildProcess.on("close", async () => {
	if (buildProcess.exitCode !== 0) {
		console.error("error during build");
		return;
	}

    await fs.ensureDir('dist');

	const packages = await getAllPackages();

    for (const package of packages) {
        const targetDir =  `./dist${package.url}`;
        await fs.ensureDir(targetDir);
        fs.copy(package.buildPath, targetDir);
    }
});

async function getAllPackages() {
	const packages = await glob("./packages/**/package.json", {
		ignore: ["./**/node_modules"],
	});

	const transformedPaths = packages.map((path) => ({
		buildPath: path.slice(0, -13).concat('/dist'),
		url: path.slice(10, -13).replaceAll("/index", ""),
	}));

	return transformedPaths;
}
