import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChevronUp } from "lucide-react";
import Logo from "./Logo";
import { INTRO_REST_DELAY } from "../intro";
import "./Navbar.css";

const NAV_LINKS = ["Servicios", "Proyectos", "Equipo", "FAQs", "Contacto"];

type NavbarTheme = "on-light" | "on-dark";

const navbarVariants = {
	hidden: { opacity: 0, y: -20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.65,
			ease: [0.22, 1, 0.36, 1] as const,
			delay: INTRO_REST_DELAY,
			staggerChildren: 0.06,
			delayChildren: 0.08,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: -12 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1] as const,
		},
	},
};

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [theme, setTheme] = useState<NavbarTheme>("on-light");

	useEffect(() => {
		const sections = [
			...document.querySelectorAll<HTMLElement>("[data-navbar-theme]"),
		];

		if (sections.length === 0) return;

		// El callback del IntersectionObserver solo trae entradas que
		// cambiaron: hay que acumular ratios y elegir sobre el set completo.
		const ratios = new Map<Element, number>();

		const applyTheme = (el: Element) => {
			const sectionTheme = el.getAttribute("data-navbar-theme");
			if (sectionTheme === "light" || sectionTheme === "dark") {
				setTheme(sectionTheme === "light" ? "on-light" : "on-dark");
			}
		};

		const pickMostVisible = () => {
			let best: Element | null = null;
			let bestRatio = 0;

			for (const [el, ratio] of ratios) {
				if (ratio > bestRatio) {
					bestRatio = ratio;
					best = el;
				}
			}

			if (best && bestRatio > 0) {
				applyTheme(best);
				return;
			}

			// Nada en la banda (p. ej. al volver al tope): usar el scroll.
			if (window.scrollY < 80) {
				const hero = sections.find(
					(section) =>
						section.getAttribute("data-navbar-theme") === "light",
				);
				if (hero) applyTheme(hero);
			}
		};

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					ratios.set(
						entry.target,
						entry.isIntersecting ? entry.intersectionRatio : 0,
					);
				}
				pickMostVisible();
			},
			{
				rootMargin: "-80px 0px -70% 0px",
				threshold: [0, 0.25, 0.5, 0.75, 1],
			},
		);

		for (const section of sections) {
			ratios.set(section, 0);
			observer.observe(section);
		}

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [menuOpen]);

	const navbarTheme = menuOpen ? "on-dark" : theme;

	return (
		<>
			<motion.header
				className={`navbar navbar--${navbarTheme}${menuOpen ? " navbar--drawer-open" : ""}`}
				variants={navbarVariants}
				initial="hidden"
				animate="visible"
			>
				<div className="navbar__inner">
					<motion.a
						href="#"
						className="navbar__logo"
						aria-label="Aedes"
						variants={itemVariants}
					>
						<Logo className="navbar__logo-svg" />
					</motion.a>

					<motion.nav
						className="navbar__nav"
						aria-label="Principal"
						variants={navbarVariants}
					>
						{NAV_LINKS.map((link) => (
							<motion.a
								key={link}
								href="#"
								className="navbar__link"
								variants={itemVariants}
							>
								{link}
							</motion.a>
						))}
					</motion.nav>

					<motion.div
						className="navbar__actions"
						variants={itemVariants}
					>
						<a href="#" className="navbar__cta">
							Hablemos de tu proyecto
						</a>

						<button
							type="button"
							className={`navbar__menu-btn${menuOpen ? " navbar__menu-btn--open" : ""}`}
							onClick={() => setMenuOpen((open) => !open)}
							aria-expanded={menuOpen}
							aria-label="Toggle menu"
						>
							Menu
							<ChevronUp />
						</button>
					</motion.div>
				</div>
			</motion.header>

			<div
				className={`drawer-overlay${menuOpen ? " drawer-overlay--open" : ""}`}
				aria-hidden={!menuOpen}
			>
				<nav className="drawer-overlay__nav">
					{NAV_LINKS.map((link) => (
						<a
							key={link}
							href="#"
							className="drawer-overlay__link"
							onClick={() => setMenuOpen(false)}
						>
							{link}
						</a>
					))}
				</nav>
				<a
					href="#"
					className="drawer-overlay__cta"
					onClick={() => setMenuOpen(false)}
				>
					Hablemos de tu proyecto
				</a>
				<p className="drawer-overlay__footer">
					© {new Date().getFullYear()} Aedes Technologies. All rights
					reserved.
				</p>
			</div>
		</>
	);
}
