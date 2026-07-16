import { motion } from "motion/react";
import FitText from "./FitText";
import Logo from "./Logo";
import {
	INTRO_BOTTOM_DURATION,
	INTRO_BOTTOM_Y,
	INTRO_EASE,
	INTRO_REST_DELAY,
	LOGO_RISE_DURATION,
} from "../intro";
import "./Hero.css";

const logoVariants = {
	hidden: { y: "85vh" },
	visible: {
		y: 0,
		transition: {
			duration: LOGO_RISE_DURATION,
			ease: INTRO_EASE,
		},
	},
};

const restItemVariants = {
	hidden: { opacity: 0, y: 36 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.85,
			ease: INTRO_EASE,
		},
	},
};

const restGroupVariants = {
	hidden: {},
	visible: {
		transition: {
			delayChildren: INTRO_REST_DELAY,
			staggerChildren: 0.14,
		},
	},
};

const bottomRiseTransition = {
	duration: INTRO_BOTTOM_DURATION,
	ease: INTRO_EASE,
	delay: INTRO_REST_DELAY,
};

export default function Hero() {
	return (
		<section className="hero" data-navbar-theme="light">
			<div className="hero__center">
				<motion.div
					className="hero__logo-wrap"
					variants={logoVariants}
					initial="hidden"
					animate="visible"
				>
					<Logo className="hero__logo" />
				</motion.div>

				<motion.div
					variants={restGroupVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.p
						className="hero__subtitle"
						variants={restItemVariants}
					>
						Desarrollamos software a medida que automatiza procesos,
						optimiza operaciones y acompaña el crecimiento de tu
						empresa.
					</motion.p>
				</motion.div>
			</div>

			<motion.div
				className="hero__bottom-copy"
				initial={{ y: INTRO_BOTTOM_Y }}
				animate={{ y: 0 }}
				transition={bottomRiseTransition}
			>
				<FitText className="hero__title hero__title--main">
					AedesTech
				</FitText>
			</motion.div>
		</section>
	);
}
