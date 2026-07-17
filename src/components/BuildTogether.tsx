import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { INTRO_EASE } from "../intro";
import { WHATSAPP_URL } from "../whatsapp";
import projects from "../projects/projects.json";
import fondo from "../assets/fondo.webp";
import "./BuildTogether.css";

const TITLE_LINES: {
	text: string;
	shift: string;
	accent?: boolean;
}[] = [
	{ text: "VAMOS A", shift: "8%" },
	{ text: "CONSTRUIR", shift: "18%" },
	{ text: "ALGO", shift: "-14%" },
	{ text: "JUNTOS", shift: "10%", accent: true },
];

const uniqueClients = new Set(projects.map((p) => p.cliente)).size;

const METRICS = [
	{
		value: String(projects.length),
		label: "Proyectos en producción",
	},
	{
		value: String(uniqueClients),
		label: "Clientes activos",
	},
	{
		value: "4.000+",
		label: "Operaciones registradas",
	},
] as const;

const screenVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.08,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.85, ease: INTRO_EASE },
	},
};

export default function BuildTogether() {
	const sectionRef = useRef<HTMLElement>(null);
	const screen1Ref = useRef<HTMLDivElement>(null);
	const screen2Ref = useRef<HTMLDivElement>(null);
	const screen1InView = useInView(screen1Ref, { once: true, amount: 0.35 });
	const screen2InView = useInView(screen2Ref, { once: true, amount: 0.35 });

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});
	const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

	return (
		<section
			ref={sectionRef}
			id="contacto"
			className="build-together"
			data-navbar-theme="light"
			aria-labelledby="build-together-title"
		>
			<motion.div
				className="build-together__bg"
				style={{ backgroundImage: `url(${fondo})`, y: bgY }}
				aria-hidden="true"
			/>

			<div className="build-together__content">
				<div ref={screen1Ref} className="build-together__screen">
					<motion.div
						className="build-together__screen-inner build-together__screen-inner--cta"
						variants={screenVariants}
						initial="hidden"
						animate={screen1InView ? "visible" : "hidden"}
					>
						<h2
							id="build-together-title"
							className="build-together__title"
						>
							{TITLE_LINES.map((line) => (
								<motion.span
									key={line.text}
									className={`build-together__title-line${
										line.accent
											? " build-together__title-line--accent"
											: ""
									}`}
									style={{
										["--shift" as string]: line.shift,
									}}
									variants={itemVariants}
								>
									{line.text}
								</motion.span>
							))}
						</h2>

						<motion.a
							href={WHATSAPP_URL}
							className="build-together__btn"
							target="_blank"
							rel="noopener noreferrer"
							variants={itemVariants}
						>
							<span className="build-together__btn-label">
								Contanos tu idea
							</span>
							<span
								className="build-together__btn-icon"
								aria-hidden="true"
							>
								<span className="build-together__btn-arrow">
									↗
								</span>
							</span>
						</motion.a>
					</motion.div>
				</div>

				<div ref={screen2Ref} className="build-together__screen">
					<motion.div
						className="build-together__screen-inner build-together__screen-inner--proof"
						variants={screenVariants}
						initial="hidden"
						animate={screen2InView ? "visible" : "hidden"}
					>
						<motion.ul
							className="build-together__metrics"
							variants={itemVariants}
						>
							{METRICS.map((metric) => (
								<li
									key={metric.label}
									className="build-together__metric"
								>
									<span className="build-together__metric-value">
										{metric.value}
									</span>
									<span className="build-together__metric-label">
										{metric.label}
									</span>
								</li>
							))}
						</motion.ul>

						<figure className="build-together__quote">
							<motion.span
								className="build-together__quote-mark"
								aria-hidden="true"
								variants={itemVariants}
							>
								“
							</motion.span>
							<motion.blockquote variants={itemVariants}>
								Gente con la que da gusto trabajar, siempre
								atentos y predispuestos a ayudar. Realmente
								sentís que quieren que te vaya bien.
							</motion.blockquote>
							<motion.figcaption variants={itemVariants}>
								<span className="build-together__quote-dash">
									—
								</span>{" "}
								Don Fortunato
							</motion.figcaption>
						</figure>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
