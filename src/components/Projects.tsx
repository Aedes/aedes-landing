import { useEffect, useRef, useState } from "react";
import {
	AnimatePresence,
	motion,
	useInView,
	useScroll,
	useSpring,
	useTransform,
} from "motion/react";
import { INTRO_EASE } from "../intro";
import projectsData from "../projects/projects.json";
import type { Project } from "../projects/types";
import tuRepeSafari from "../assets/tu-repe-safari.webp";
import bookifySafari from "../assets/bookify-safari.webp";
import toiletsSafari from "../assets/toilets-safari.webp";
import pampaRentalSafari from "../assets/pampa-rental.webp";
import lmbSafari from "../assets/lmb.webp";
import carniceriaSafari from "../assets/carniceria.webp";
import rentalAlertasSafari from "../assets/rental-alertas.webp";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

const LOCAL_UI_IMAGES: Record<string, string> = {
	"tu-repe-safari.webp": tuRepeSafari,
	"bookify-safari.webp": bookifySafari,
	"toilets-safari.webp": toiletsSafari,
	"pampa-rental.webp": pampaRentalSafari,
	"rental-alertas.webp": rentalAlertasSafari,
	"lmb.webp": lmbSafari,
	"carniceria.webp": carniceriaSafari,
};

const PROJECTS = (projectsData as Project[]).map((project) => ({
	...project,
	imagen_interfaz:
		LOCAL_UI_IMAGES[project.imagen_interfaz] ?? project.imagen_interfaz,
}));

const INDUSTRIES = [
	{
		name: "Transporte",
		image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80",
	},
	{
		name: "Deporte",
		image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1400&q=80",
	},
	{
		name: "Clínicas",
		image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80",
	},
	{
		name: "Energía",
		image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1400&q=80",
	},
	{
		name: "Comercio",
		image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
	},
] as const;

const SLIDE_INTERVAL_MS = 500;

export default function Projects() {
	const introRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(introRef, { amount: 0.2 });
	const [activeIndustry, setActiveIndustry] = useState(0);

	const { scrollYProgress } = useScroll({
		target: introRef,
		offset: ["start start", "end end"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 90,
		damping: 28,
		mass: 0.35,
		restDelta: 0.001,
		skipInitialAnimation: true,
	});

	const leftX = useTransform(smoothProgress, [0, 0.55], ["-48%", "0%"]);
	const leftOpacity = useTransform(
		smoothProgress,
		[0, 0.2, 0.55],
		[0, 0.65, 1],
	);

	const rightX = useTransform(smoothProgress, [0, 0.55], ["48%", "0%"]);
	const rightOpacity = useTransform(
		smoothProgress,
		[0, 0.2, 0.55],
		[0, 0.65, 1],
	);

	const frameScale = useTransform(smoothProgress, [0, 0.8], [0.38, 1]);
	const frameRadius = useTransform(smoothProgress, [0, 0.8], [4, 12]);

	useEffect(() => {
		if (!isInView) return;

		const id = window.setInterval(() => {
			setActiveIndustry((current) => (current + 1) % INDUSTRIES.length);
		}, SLIDE_INTERVAL_MS);

		return () => window.clearInterval(id);
	}, [isInView]);

	return (
		<section id="proyectos" className="projects" data-navbar-theme="dark">
			<div ref={introRef} className="projects__intro">
				<div className="projects__sticky">
					<div className="projects__stage">
						<motion.p
							className="projects__title projects__title--left"
							style={{ x: leftX, opacity: leftOpacity }}
						>
							Cada industria tiene sus desafíos
						</motion.p>

						<motion.div
							className="projects__frame"
							style={{
								scale: frameScale,
								borderRadius: frameRadius,
							}}
						>
							<AnimatePresence mode="sync">
								{INDUSTRIES.map((industry, index) =>
									index === activeIndustry ? (
										<motion.div
											key={industry.name}
											className="projects__slide"
											initial={{
												opacity: 0,
												scale: 1.06,
											}}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0 }}
											transition={{
												duration: 0.55,
												ease: INTRO_EASE,
											}}
										>
											<img
												src={industry.image}
												alt=""
												className="projects__image"
												draggable={false}
											/>
											<span className="projects__industry">
												{industry.name}
											</span>
										</motion.div>
									) : null,
								)}
							</AnimatePresence>
						</motion.div>

						<motion.p
							className="projects__title projects__title--right"
							style={{ x: rightX, opacity: rightOpacity }}
						>
							Nos gusta resolverlos.
						</motion.p>
					</div>
				</div>
			</div>

			<div className="projects__stories">
				<div className="projects__stories-layout">
					<p className="projects__stories-label">
						Historias de éxito
					</p>

					<div className="projects__stories-list">
						{PROJECTS.map((project) => (
							<ProjectCard project={project} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
