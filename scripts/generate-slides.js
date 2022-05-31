const glob = require("fast-glob");
const fs = require("fs-extra");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { join: joinPath } = require("path");

const SLIDES_ROOT = "./slides";
const SLIDES_ENTRY = "slides.md";

async function getAllSlidePaths() {
	const packages = await glob(`${SLIDES_ROOT}/*/${SLIDES_ENTRY}`);

	const transformedPaths = packages.map((path) => ({
		source: path.slice(0, -SLIDES_ENTRY.length),
		url: path.slice(SLIDES_ROOT.length + 1, -SLIDES_ENTRY.length - 1),
	}));

	return transformedPaths;
}

async function generateSlides() {
	const slidePaths = await getAllSlidePaths();
	console.log(slidePaths);

	for (const path of slidePaths) {
		const targetDir = `./dist/slides/${path.url}`;
		await fs.ensureDir(targetDir);

/* 		const command = `pnpm slidev build ${SLIDES_ENTRY} -- --base="/slides/${path.url}/"`;

		const { err } = await exec(command, {
			cwd: joinPath(process.cwd(), path.source),
		});

        if(err) return;
 */
        await fs.copy(`${path.source}/dist`, targetDir);
        fs.remove(`${path.source}/dist`);
	}
}

generateSlides();

