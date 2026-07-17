import { useRef } from "react";
import { motion, useInView } from "motion/react";
import FitText from "./FitText";
import { INTRO_EASE } from "../intro";
import "./HowWeWork.css";

const STEPS = [
	{
		number: "01",
		title: "Relevamiento",
		description:
			"Entendemos tu proceso actual, hablamos con quienes lo viven día a día y detectamos dónde está la fricción real: cuellos de botella, trabajo manual y oportunidades de automatizar.",
	},
	{
		number: "02",
		title: "Propuesta",
		description:
			"Te armamos una solución concreta, con alcance definido, prioridades claras, tiempos realistas y criterios de éxito. Sin sorpresas: sabés qué se construye y por qué.",
	},
	{
		number: "03",
		title: "Desarrollo",
		description:
			"Construimos el software en ciclos cortos, con avances que podés ir viendo. Iteramos con tu feedback temprano para que el resultado se acerque a cómo trabaja tu equipo.",
	},
	{
		number: "04",
		title: "Entrega y soporte",
		description:
			"Lo ponemos en producción, acompañamos la adopción y seguimos cerca. Si aparecen ajustes, cambios o nuevas necesidades, estamos del otro lado.",
	},
] as const;

const titleVariants = {
	hidden: { opacity: 0, y: 48 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.9, ease: INTRO_EASE },
	},
};

const listVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.12,
			delayChildren: 0.2,
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

export default function HowWeWork() {
	const sectionRef = useRef<HTMLElement>(null);
	const inView = useInView(sectionRef, { once: true, amount: 0.25 });

	return (
		<section
			ref={sectionRef}
			id="como-trabajamos"
			className="how-we-work"
			data-navbar-theme="light"
		>
			<motion.div
				className="how-we-work__title-wrap"
				variants={titleVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				<FitText className="how-we-work__title">CÓMO TRABAJAMOS</FitText>
			</motion.div>

			<motion.ol
				className="how-we-work__steps"
				variants={listVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				{STEPS.map((step) => (
					<motion.li
						key={step.number}
						className="how-we-work__step"
						variants={itemVariants}
					>
						<span className="how-we-work__number" aria-hidden>
							{step.number}
						</span>
						<h3 className="how-we-work__step-title">{step.title}</h3>
						<p className="how-we-work__step-text">{step.description}</p>
					</motion.li>
				))}
			</motion.ol>
		</section>
	);
}
