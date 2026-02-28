import { createElement, type ReactNode } from "react";
import { Link, Text } from "@react-pdf/renderer";
import { colors } from "../styles/theme";

type Token =
	| { type: "text"; value: string }
	| { type: "bold"; value: string }
	| { type: "italic"; value: string }
	| { type: "link"; value: string; href: string };

const INLINE_MARKDOWN_RE = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
const LINK_RE = /^\[([^\]]+)\]\(([^)]+)\)$/;
const SITE_URL = import.meta.env.SITE;

function resolveSiteUrlForHtml(value: string): string {
	return value.replaceAll("$siteUrl", "");
}

function resolveSiteUrlForJsx(value: string): string {
	if (!SITE_URL) {
		return value;
	}

	const normalizedSiteUrl = SITE_URL.endsWith("/") ? SITE_URL.slice(0, -1) : SITE_URL;
	return value.replaceAll("$siteUrl", normalizedSiteUrl);
}

function tokenizeMarkdown(input: string, format: "html" | "jsx"): Token[] {
	const resolveSiteUrl = format === "html" ? resolveSiteUrlForHtml : resolveSiteUrlForJsx;

	return resolveSiteUrl(input)
		.split(INLINE_MARKDOWN_RE)
		.filter(Boolean)
		.map((part) => {
			if (part.startsWith("**") && part.endsWith("**")) {
				return { type: "bold", value: part.slice(2, -2) };
			}

			if (part.startsWith("*") && part.endsWith("*")) {
				return { type: "italic", value: part.slice(1, -1) };
			}

			const match = part.match(LINK_RE);
			if (match) {
				const [, value, href] = match;
				if (value && href) {
					return { type: "link", value, href: resolveSiteUrl(href) };
				}
			}

			return { type: "text", value: resolveSiteUrl(part) };
		});
}

function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");
}

export function markdownToHtml(input: string): string {
	return tokenizeMarkdown(input, "html")
		.map((token) => {
			switch (token.type) {
				case "bold":
					return `<strong>${escapeHtml(token.value)}</strong>`;
				case "italic":
					return `<em>${escapeHtml(token.value)}</em>`;
				case "link":
					return `<a href="${escapeHtml(token.href)}">${escapeHtml(token.value)}</a>`;
				case "text":
					return escapeHtml(token.value);
			}
		})
		.join("");
}

export function markdownToPdfJsx(input: string): ReactNode[] {
	return tokenizeMarkdown(input, "jsx").map((token, index) => {
		switch (token.type) {
			case "bold":
				return createElement(Text, { key: index, style: { fontWeight: 700 } }, token.value);
			case "italic":
				return createElement(Text, { key: index, style: { fontStyle: "italic" } }, token.value);
			case "link":
				return createElement(
					Link,
					{ key: index, src: token.href, style: { color: colors.slate[500] } },
					token.value,
				);
			case "text":
				return createElement(Text, { key: index }, token.value);
		}
	});
}
