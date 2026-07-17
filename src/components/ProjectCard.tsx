import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { Project } from "../projects/types";

type ProjectCardProps = {
	project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
	const mediaRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: mediaRef,
		offset: ["start end", "end start"],
	});
	const industryY = useTransform(scrollYProgress, [0, 1], ["-28%", "28%"]);

	return (
		<article className="project-card">
			<div ref={mediaRef} className="project-card__media">
				<motion.img
					src={project.imagen_industria}
					alt=""
					className="project-card__industry"
					style={{ y: industryY }}
					draggable={false}
				/>

				<div className="project-card__dim" aria-hidden="true" />

				<span className="project-card__industry-tag">
					{project.industria_corta}
				</span>

				<div className="project-card__ui">
					<img
						src={project.imagen_interfaz}
						alt={`Interfaz de ${project.nombre}`}
						className="project-card__ui-image"
						draggable={false}
					/>
				</div>
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
				{project.url ? (
					<a
						href={project.url}
						className="project-card__link"
						target="_blank"
						rel="noopener noreferrer"
					>
						Visitar sitio
					</a>
				) : null}
			</div>
		</article>
	);
}
