import { Document, Page, Text, View, StyleSheet, Font, Link } from "@react-pdf/renderer";
import path from "node:path";
import { colors } from "../styles/theme";
import type { CollectionEntry } from "astro:content";
import { markdownToPdfJsx } from "../utils/markdown";

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

	/* Projects on 2nd page */
	projectsPage: {
		fontFamily: "Ranade",
		fontSize: 10,
		fontWeight: 400,
		lineHeight: 1.6,
		color: colors.slate[500],
		paddingHorizontal: 36,
		paddingVertical: 40,
	},
	projectsHeading: {
		fontSize: 14,
		fontWeight: 700,
		color: colors.cyan[500],
	},
	projectsItems: {
		paddingTop: 24,
		gap: 20,
	},
	projectItemHeading: {
		fontSize: 11,
		fontWeight: 700,
		color: colors.slate[800],
		textDecoration: "none",
	},
	projectItemDescription: {
		fontFamily: "Atkinson Hyperlegible",
		marginTop: 6,
		maxWidth: 320,
	},
	projectRepoText: {
		fontFamily: "Atkinson Hyperlegible",
		marginTop: 4,
		maxWidth: 320,
		color: colors.slate[500],
	},
	projectRepoLink: {
		fontFamily: "Atkinson Hyperlegible",
		color: colors.cyan[600],
		textDecoration: "none",
		fontWeight: 700,
		maxWidth: 320,
	},
});

// Create Document Component
export default ({
	site,
	experiences,
	projects,
}: {
	site: URL;
	experiences: Array<CollectionEntry<"experience">>;
	projects: Array<CollectionEntry<"projects">>;
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
											<Text>{markdownToPdfJsx(desc)}</Text>
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
				<View>
					<Text style={[styles.asideHeading, { marginTop: 0 }]}>Skills</Text>

					<Text style={styles.asideSubHeading}>Programming Languages</Text>
					<Text style={styles.asideContent}>
						Java-/TypeScript, PHP, Python, Nix, Bash, HTML, CSS
					</Text>

					<Text style={styles.asideSubHeading}>Libraries & Frameworks</Text>
					<Text style={styles.asideContent}>
						Vue & Nuxt, React, Tailwindcss, Express/Fastify, Vite
					</Text>

					<Text style={styles.asideSubHeading}>Tools & Platforms</Text>
					<Text style={styles.asideContent}>
						Git, Docker (Compose), GitHub & -Lab (incl. CI/CD), Turborepo, Netlify, Hetzner, Figma
					</Text>

					<Text style={styles.asideHeading}>Education</Text>

					<Text style={styles.asideSubHeading}>Universität zu Lübeck</Text>
					<Text style={styles.asideContent}>Media Informatics, B.Sc.</Text>
					<Text style={styles.asideContent}>Media Informatics, M.Sc.</Text>

					<Text style={styles.asideHeading}>Interests</Text>
					<Text style={{ ...styles.asideContent, marginTop: 8 }}>
						Kite surfing, rock climbing, smart home & self-hosting, baking, gaming
					</Text>
				</View>
			</View>
		</Page>
		<Page size="A4" style={styles.projectsPage}>
			<Text style={styles.projectsHeading}>Some of My Projects</Text>
			<View style={styles.projectsItems}>
				{projects.map((project) => (
					<View key={project.id}>
						<Link
							src={new URL(`/projects/${project.id}`, site).toString()}
							style={styles.projectItemHeading}
						>
							{project.data.title}
						</Link>
						<Text style={styles.projectItemDescription}>{project.data.resumeDescription}</Text>
						{project.data.link && (
							<>
								<Text style={styles.projectRepoText}>Open-source and available on GitHub:</Text>
								<Link src={project.data.link} style={styles.projectRepoLink}>
									{formatUrlForPrint(project.data.link)}
								</Link>
							</>
						)}
					</View>
				))}
			</View>
		</Page>
	</Document>
);

function formatUrlForPrint(url: string) {
	return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
