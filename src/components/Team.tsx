import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { INTRO_EASE } from "../intro";
import valentino from "../assets/valentino.png";
import faustino from "../assets/faustino.png";
import ignacio from "../assets/ignacio.png";
import "./Team.css";

const MEMBERS = [
	{
		number: "01",
		name: "Valentino Araya",
		role: "Co-fundador · Full Stack",
		bio: "Diseño, desarrollo y despliegue end-to-end: del backend a la experiencia usuario, siempre en contacto con quienes usan el sistema.",
		image: "valentino.png",
		linkedin: "https://www.linkedin.com/in/valentinoaraya/",
	},
	{
		number: "02",
		name: "Faustino Durán",
		role: "Co-fundador · Full Stack",
		bio: "Full stack en todas las etapas: desde entrevistas y definición de requisitos hasta código en producción, con foco en resolver el problema real.",
		image: "faustino.png",
		linkedin: "https://www.linkedin.com/in/faustino-duran-a8b17a273/",
	},
	{
		number: "03",
		name: "Ignacio Patiño",
		role: "Co-fundador · Full Stack",
		bio: "Construcción de sistemas robustos y usables, integrando diseño, frontend y backend para entregar producto terminado y mantenible.",
		image: "ignacio.png",
		linkedin:
			"https://www.linkedin.com/in/ignacio-patiño-851701160/",
	},
] as const;

const LOCAL_UI_IMAGES: Record<string, string> = {
	"valentino.png": valentino,
	"faustino.png": faustino,
	"ignacio.png": ignacio,
};

const titleVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: INTRO_EASE },
	},
};

const listVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.12,
			delayChildren: 0.15,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 36 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.75, ease: INTRO_EASE },
	},
};

export default function Team() {
	const sectionRef = useRef<HTMLElement>(null);
	const inView = useInView(sectionRef, { once: true, amount: 0.25 });

	return (
		<section
			ref={sectionRef}
			id="equipo"
			className="team"
			data-navbar-theme="light"
			aria-labelledby="team-heading"
		>
			<motion.h2
				id="team-heading"
				className="team__title"
				variants={titleVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				Nuestro equipo
			</motion.h2>

			<motion.ul
				className="team__members"
				variants={listVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				{MEMBERS.map((member) => (
					<motion.li
						key={member.number}
						className="team__member"
						variants={itemVariants}
					>
						<div className="team__photo-wrap">
							<img
								src={
									LOCAL_UI_IMAGES[member.image] ??
									member.image
								}
								alt=""
								className="team__photo"
								draggable={false}
							/>
						</div>
						<span className="team__number" aria-hidden>
							{member.number}
						</span>
						<h3 className="team__name">{member.name}</h3>
						<p className="team__role">{member.role}</p>
						<p className="team__bio">{member.bio}</p>
						<a
							href={member.linkedin}
							className="team__linkedin"
							target="_blank"
							rel="noopener noreferrer"
						>
							LinkedIn
						</a>
					</motion.li>
				))}
			</motion.ul>
		</section>
	);
}
