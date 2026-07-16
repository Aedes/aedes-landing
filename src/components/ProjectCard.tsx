import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { INTRO_EASE } from "../intro";
import type { Project } from "../projects/types";

type ProjectCardProps = {
	project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
	const mediaRef = useRef<HTMLDivElement>(null);
	const [hovered, setHovered] = useState(false);

	const { scrollYProgress } = useScroll({
		target: mediaRef,
		offset: ["start end", "end start"],
	});
	const industryY = useTransform(scrollYProgress, [0, 1], ["-28%", "28%"]);

	return (
		<article
			className="project-card"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div ref={mediaRef} className="project-card__media">
				<motion.img
					src={project.imagen_industria}
					alt=""
					className="project-card__industry"
					style={{ y: industryY }}
					draggable={false}
				/>

				<motion.div
					className="project-card__dim"
					initial={false}
					animate={{ opacity: hovered ? 1 : 0 }}
					transition={{ duration: 0.45, ease: INTRO_EASE }}
				/>

				<span className="project-card__industry-tag">
					{project.industria_corta}
				</span>

				<motion.div
					className="project-card__ui"
					initial={false}
					animate={
						hovered
							? { x: "-50%", y: "-50%", opacity: 1 }
							: { x: "-50%", y: "55%", opacity: 0 }
					}
					transition={{ duration: 0.55, ease: INTRO_EASE }}
				>
					<img
						src={project.imagen_interfaz}
						alt={`Interfaz de ${project.nombre}`}
						className="project-card__ui-image"
						draggable={false}
					/>
				</motion.div>
			</div>

			<div className="project-card__copy">
				<p className="project-card__client">{project.cliente}</p>
				<h3 className="project-card__name">{project.nombre}</h3>
				<p className="project-card__result">{project.resultado}</p>
				<p className="project-card__solution">{project.solucion}</p>
				<ul
					className="project-card__stack"
					aria-label="Stack tecnológico"
				>
					{project.stack.slice(0, 5).map((tech) => (
						<li key={tech}>{tech}</li>
					))}
				</ul>
			</div>
		</article>
	);
}
