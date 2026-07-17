import { useRef } from "react";
import { motion, useInView } from "motion/react";
import FitText from "./FitText";
import { INTRO_EASE } from "../intro";
import { WHATSAPP_URL } from "../whatsapp";
import "./Footer.css";

const NAV_COL = [
	{ label: "Inicio", href: "#" },
	{ label: "Servicios", href: "#servicios" },
	{ label: "Proyectos", href: "#proyectos" },
	{ label: "Cómo trabajamos", href: "#como-trabajamos" },
	{ label: "Equipo", href: "#equipo" },
] as const;

const MORE_COL = [{ label: "Contacto", href: "#contacto" }] as const;

const CONTACT_COL = [
	{
		label: "aedestechnologies@gmail.com",
		href: "mailto:aedestechnologies@gmail.com",
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/company/aedestech",
		external: true,
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/aedes.tech/",
		external: true,
	},
] as const;

export default function Footer() {
	const footerRef = useRef<HTMLElement>(null);
	const inView = useInView(footerRef, { once: true, amount: 0.35 });
	const year = new Date().getFullYear();

	return (
		<footer
			ref={footerRef}
			className="site-footer"
			data-navbar-theme="light"
		>
			<motion.div
				className="site-footer__wordmark"
				aria-hidden="true"
				initial={{ opacity: 0, y: 36 }}
				animate={inView ? { opacity: 1, y: 0 } : undefined}
				transition={{ duration: 0.9, ease: INTRO_EASE }}
			>
				<FitText className="site-footer__wordmark-text" maxSize={1400}>
					Aedes.
				</FitText>
			</motion.div>

			<motion.div
				className="site-footer__glass"
				initial={{ opacity: 0, y: 56 }}
				animate={inView ? { opacity: 1, y: 0 } : undefined}
				transition={{
					duration: 0.95,
					ease: INTRO_EASE,
					delay: 0.4,
				}}
			>
				<div className="site-footer__inner">
					<div className="site-footer__cols">
						<nav
							className="site-footer__col"
							aria-label="Navegación"
						>
							{NAV_COL.map((link) => (
								<a key={link.label} href={link.href}>
									{link.label}
								</a>
							))}
						</nav>

						<nav className="site-footer__col" aria-label="Más">
							{MORE_COL.map((link) => (
								<a key={link.label} href={link.href}>
									{link.label}
								</a>
							))}
						</nav>

						<nav className="site-footer__col" aria-label="Contacto">
							{CONTACT_COL.map((link) => (
								<a
									key={link.label}
									href={link.href}
									{...("external" in link && link.external
										? {
												target: "_blank",
												rel: "noopener noreferrer",
											}
										: {})}
								>
									{link.label}
								</a>
							))}
						</nav>
					</div>

					<a
						href={WHATSAPP_URL}
						className="site-footer__cta"
						target="_blank"
						rel="noopener noreferrer"
					>
						Hablemos de tu proyecto
					</a>
				</div>

				<p className="site-footer__legal">
					© {year} Aedes Technologies. All rights reserved.
				</p>
			</motion.div>
		</footer>
	);
}
