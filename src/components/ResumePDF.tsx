import { Document, Page, Text, View, StyleSheet, Font, Link, Svg, Path } from "@react-pdf/renderer";
import path from "node:path";
import twConfig from "../.../../../tailwind.config";
import type { CollectionEntry } from "astro:content";

const fontPath = path.join(process.cwd(), "./src/assets");
Font.register({
	family: "Ranade",
	src: path.join(fontPath, "Ranade-Regular.woff"),
	fontWeight: 400,
});
Font.register({
	family: "Ranade",
	src: path.join(fontPath, "Ranade-Medium.woff"),
	fontWeight: 500,
});
Font.register({
	family: "Ranade",
	src: path.join(fontPath, "Ranade-Bold.woff"),
	fontWeight: 700,
});
Font.register({
	family: "Atkinson Hyperlegible",
	src: path.join(fontPath, "Atkinson-Hyperlegible-Regular-102.woff"),
	fontWeight: 400,
});
Font.register({
	family: "Atkinson Hyperlegible",
	src: path.join(fontPath, "Atkinson-Hyperlegible-Bold-102.woff"),
	fontWeight: 700,
});

const colors = twConfig.theme.colors;
const headerHeight = 100;

const styles = StyleSheet.create({
	// Create styles
	page: {
		fontFamily: "Ranade",
		fontSize: 10,
		fontWeight: 400,
		lineHeight: 1.6,
		color: colors.slate[500],
		flexDirection: "row",
		gap: 40,
		paddingHorizontal: 36,
		paddingVertical: 40,
	},

	/* Main */
	main: {
		gap: 24,
		width: "100%",
	},
	header: {
		height: headerHeight,
	},
	heading: {
		fontSize: 32,
		fontWeight: 700,
		color: colors.cyan[400],
		lineHeight: 1,
		marginBottom: 12,
	},
	subheading: {
		color: colors.slate[500],
	},
	experience: {},
	experienceHeading: {
		fontSize: 14,
		fontWeight: 700,
		color: colors.cyan[500],
	},
	experienceItems: {
		gap: 20,
		paddingTop: 10,
	},
	experienceItem: {},
	experienceItemHeading: {
		fontSize: 11,
		color: colors.slate[600],
	},
	experienceCompany: {
		color: colors.slate[800],
		fontWeight: 700,
	},
	experienceTime: {
		fontFamily: "Atkinson Hyperlegible",
		marginTop: 1,
	},
	experienceDescription: {
		fontFamily: "Atkinson Hyperlegible",
		marginTop: 4,
		gap: 3,
	},
	experienceDescriptionItem: {
		flexDirection: "row",
		gap: 3,
	},

	/* Aside */
	aside: {
		width: 170,
		minWidth: 170,
		gap: 24,
	},
	asideHeading: {
		marginTop: 36,
		fontSize: 14,
		fontWeight: 700,
		color: colors.cyan[500],
	},
	asideSubHeading: {
		marginTop: 10,
		marginBottom: 2,
		fontWeight: 700,
		color: colors.slate[800],
	},
	contact: {
		fontFamily: "Atkinson Hyperlegible",
		paddingTop: 12,
		height: headerHeight,
	},
	contactLink: {
		color: colors.slate[500],
		textDecoration: "none",
	},
	asideContent: {
		fontFamily: "Atkinson Hyperlegible",
	},
});

// Create Document Component
export default ({
	site,
	experiences,
}: {
	site: URL;
	experiences: Array<CollectionEntry<"experience">>;
}) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.main}>
				<View style={styles.header}>
					<Text style={styles.heading}>Raimund Canzler</Text>
					<Text style={styles.subheading}>Web Developer and UX/UI Designer</Text>
				</View>

				<View style={styles.experience}>
					<Text style={styles.experienceHeading}>Experience</Text>
					<View style={styles.experienceItems}>
						{experiences.map((exp) => (
							<View style={styles.experienceItem}>
								<Text style={styles.experienceItemHeading}>
									<Text style={styles.experienceCompany}>{exp.data.company}</Text> &middot;{" "}
									{exp.data.position}
								</Text>
								<Text style={styles.experienceTime}>
									{exp.data.start.toLocaleDateString("en-US", { month: "long", year: "numeric" })} -{" "}
									{exp.data.end?.toLocaleDateString("en-US", { month: "long", year: "numeric" }) ??
										"Present"}
								</Text>
								<View style={styles.experienceDescription}>
									{exp.data.description.map((desc) => (
										<View style={styles.experienceDescriptionItem}>
											<Text>&middot;</Text>
											<Text>{desc}</Text>
										</View>
									))}
								</View>
							</View>
						))}
					</View>
				</View>
			</View>
			<View style={styles.aside}>
				<View style={styles.contact}>
					<Link src="mailto:raimund@canzler.email" style={styles.contactLink}>
						raimund@canzler.email
					</Link>
					<Link src="tel:+4915737930783" style={styles.contactLink}>
						+49 1573 7930783
					</Link>
					<Link src="https://github.com/Scalamando" style={styles.contactLink}>
						github.com/Scalamando
					</Link>
					<Link src="https://rai-canzler.de" style={styles.contactLink}>
						rai-canzler.de
					</Link>
				</View>
				<View style={styles.asideContent}>
					<Text style={[styles.asideHeading, { marginTop: 0 }]}>Skills</Text>

					<Text style={styles.asideSubHeading}>Programming Languages</Text>
					<Text style={styles.asideContent}>JavaScript, TypeScript, HTML, (S)CSS, Go</Text>

					<Text style={styles.asideSubHeading}>Libraries & Frameworks</Text>
					<Text style={styles.asideContent}>
						Vue, Nuxt, React, Astro, Tailwind, Express, Fastify, Vite
					</Text>

					<Text style={styles.asideSubHeading}>Tools & Platforms</Text>
					<Text style={styles.asideContent}>
						Git, Docker, Docker Compose, GitHub, GitLab, Netlify, Hetzner, Figma
					</Text>

					<Text style={styles.asideHeading}>Selected Project</Text>

					<Link
						src={new URL(`/projects/media-moments`, site).toString()}
						style={[
							styles.asideSubHeading,
							{ flexDirection: "row", gap: 2, textDecoration: "none" },
						]}
					>
						<Text>Media Moments</Text>
						<Svg
							width="11"
							height="11"
							viewBox="0 0 24 24"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<Path
								style={{ strokeWidth: 2 }}
								stroke={colors.slate[700]}
								d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"
							/>
							<Path style={{ strokeWidth: 2 }} stroke={colors.slate[700]} d="M11 13l9 -9" />
							<Path style={{ strokeWidth: 2 }} stroke={colors.slate[700]} d="M15 4h5v5" />
						</Svg>
					</Link>
					<Text style={styles.asideContent}>
						Event companion app that enables visitors to experience first semester media informatics
						students' projects. Among other things, projects have to be unlocked at different
						locations in the city of Lübeck which can be found using the builtin map.
					</Text>

					<Text style={styles.asideHeading}>Education</Text>

					<Text style={styles.asideSubHeading}>Universität zu Lübeck</Text>
					<Text style={styles.asideContent}>Media Informatics, B.Sc.</Text>
					<Text style={styles.asideContent}>Media Informatics, M.Sc. (in progress)</Text>

					<Text style={styles.asideHeading}>Interests</Text>
					<Text style={styles.asideContent}>Kite surfing, rock climbing, baking, gaming</Text>
				</View>
			</View>
		</Page>
	</Document>
);
