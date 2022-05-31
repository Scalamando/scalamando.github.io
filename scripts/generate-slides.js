const glob = require("fast-glob");
const fs = require("fs-extra");

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

        await fs.copy(`${path.source}/dist`, targetDir);
        fs.remove(`${path.source}/dist`);
	}
}

generateSlides();

