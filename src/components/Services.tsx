import { useRef, useState, type CSSProperties } from "react";
import {
	AnimatePresence,
	motion,
	useInView,
	useMotionValueEvent,
	useScroll,
} from "motion/react";
import { useLenis } from "lenis/react";
import { INTRO_EASE } from "../intro";
import "./Services.css";

const SERVICES = [
	{
		title: "Desarrollo de Software a medida",
		description:
			"Construimos sistemas pensados para tu operación real: flujos, roles y reglas de negocio propias, sin forzar tu empresa a un molde genérico.",
	},
	{
		title: "Automatización de procesos",
		description:
			"Sacamos del medio el trabajo manual repetitivo. Conectamos herramientas, ordenamos flujos y hacemos que las tareas corran solas con menos errores.",
	},
	{
		title: "Diseño web",
		description:
			"Diseñamos sitios claros, rápidos y con identidad. Una presencia digital que comunica bien, convierte mejor y se siente a la altura de tu marca.",
	},
	{
		title: "Apps mobile",
		description:
			"Apps nativas o multiplataforma para que tu producto o operación viajen con el usuario: performance, usabilidad y una experiencia sólida en el bolsillo.",
	},
	{
		title: "Desarrollo de API's",
		description:
			"Creamos e integramos APIs seguras, documentadas y escalables para que tus sistemas, partners y plataformas hablen el mismo idioma.",
	},
	{
		title: "Productos SaaS",
		description:
			"También desarrollamos productos propios en modelo SaaS. Soluciones listas para usar, con evolución continua, cuando no hace falta partir de cero.",
	},
] as const;

const TITLE_LINES = [
	"Dejá de perder tiempo",
	"en lo que el software",
	"puede hacer solo.",
] as const;

const listGroupVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.12,
		},
	},
};

const listItemVariants = {
	hidden: { opacity: 0, y: 28 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.7,
			ease: INTRO_EASE,
		},
	},
};

const detailEnterVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.75,
			ease: INTRO_EASE,
			delay: 0.28,
		},
	},
};

export default function Services() {
	const sectionRef = useRef<HTMLElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const bodyRef = useRef<HTMLDivElement>(null);
	const titleInView = useInView(titleRef, { once: true, amount: 0.45 });
	const bodyInView = useInView(bodyRef, { once: true, amount: 0.25 });
	const [active, setActive] = useState(0);
	const lenis = useLenis();

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	useMotionValueEvent(scrollYProgress, "change", (progress) => {
		const next = Math.min(
			SERVICES.length - 1,
			Math.max(0, Math.floor(progress * SERVICES.length)),
		);
		setActive((current) => (current === next ? current : next));
	});

	const scrollToService = (index: number) => {
		const section = sectionRef.current;
		if (!section) return;

		const totalScroll = section.offsetHeight - window.innerHeight;
		if (totalScroll <= 0) return;

		const sectionTop = section.getBoundingClientRect().top + window.scrollY;
		const target =
			sectionTop + ((index + 0.5) / SERVICES.length) * totalScroll;

		if (lenis) {
			lenis.scrollTo(target, { duration: 1.2 });
			return;
		}

		window.scrollTo({ top: target, behavior: "smooth" });
	};

	return (
		<section
			ref={sectionRef}
			className="services"
			data-navbar-theme="dark"
			style={{ "--services-count": SERVICES.length } as CSSProperties}
		>
			<div className="services__sticky">
				<div className="services__inner">
					<motion.h2
						ref={titleRef}
						className="services__title"
						initial="hidden"
						animate={titleInView ? "visible" : "hidden"}
						variants={{
							hidden: {},
							visible: {
								transition: {
									staggerChildren: 0.12,
									delayChildren: 0.05,
								},
							},
						}}
					>
						{TITLE_LINES.map((line) => (
							<span key={line} className="services__title-line">
								<motion.span
									className="services__title-text"
									variants={{
										hidden: { opacity: 0, y: "0.55em" },
										visible: {
											opacity: 1,
											y: 0,
											transition: {
												duration: 0.85,
												ease: INTRO_EASE,
											},
										},
									}}
								>
									{line}
								</motion.span>
							</span>
						))}
						{/* <motion.span
							className="services__title-text"
							variants={{
								hidden: { opacity: 0, y: "0.55em" },
								visible: {
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.85,
										ease: INTRO_EASE,
									},
								},
							}}
						>
							Dejá de perder tiempo en lo que el software puede
							hacer solo.
						</motion.span> */}
					</motion.h2>

					<div ref={bodyRef} className="services__body">
						<motion.ul
							className="services__list"
							role="list"
							initial="hidden"
							animate={bodyInView ? "visible" : "hidden"}
							variants={listGroupVariants}
						>
							{SERVICES.map((service, index) => {
								const isActive = index === active;

								return (
									<motion.li
										key={service.title}
										variants={listItemVariants}
									>
										<button
											type="button"
											className={`services__item${isActive ? " services__item--active" : ""}`}
											aria-current={
												isActive ? "true" : undefined
											}
											onClick={() =>
												scrollToService(index)
											}
										>
											<span className="services__item-index">
												{String(index + 1).padStart(
													2,
													"0",
												)}
											</span>
											<span className="services__item-title">
												{service.title}
											</span>
										</button>
									</motion.li>
								);
							})}
						</motion.ul>

						<motion.div
							className="services__detail"
							aria-live="polite"
							initial="hidden"
							animate={bodyInView ? "visible" : "hidden"}
							variants={detailEnterVariants}
						>
							<AnimatePresence mode="wait">
								<motion.div
									key={SERVICES[active].title}
									className="services__detail-inner"
									initial={{ opacity: 0, y: 18 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -14 }}
									transition={{
										duration: 0.4,
										ease: INTRO_EASE,
									}}
								>
									<p className="services__detail-label">
										{SERVICES[active].title}
									</p>
									<p className="services__detail-text">
										{SERVICES[active].description}
									</p>
								</motion.div>
							</AnimatePresence>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
