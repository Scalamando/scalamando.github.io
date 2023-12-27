/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="unplugin-icons/types/astro" />

declare module '*.woff' {
	const woff: Uint8Array;
	export default woff;
}
