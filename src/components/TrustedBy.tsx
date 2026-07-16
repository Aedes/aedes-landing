import { motion } from "motion/react";
import {
	INTRO_BOTTOM_DURATION,
	INTRO_BOTTOM_Y,
	INTRO_EASE,
	INTRO_REST_DELAY,
} from "../intro";
import "./TrustedBy.css";

const COMPANIES = [
	{
		name: "Automatizaciones",
		fontFamily: "Georgia, serif",
		fontWeight: 500,
	},
	{
		name: "Análisis",
		fontFamily: "Georgia, serif",
		fontWeight: 500,
	},
	{
		name: "Software a medida",
		fontFamily: "Georgia, serif",
		fontWeight: 500,
	},
	{
		name: "Diseño",
		fontFamily: "Georgia, serif",
		fontWeight: 500,
	},
	{
		name: "Mobile",
		fontFamily: "Georgia, serif",
		fontWeight: 500,
	},
	{
		name: "API's",
		fontFamily: "Georgia, serif",
		fontWeight: 500,
	},
	{
		name: "Sistemas",
		fontFamily: "Georgia, serif",
		fontWeight: 500,
	},
];

function CompanyGroup() {
	return (
		<div className="trusted__group">
			{COMPANIES.map((company) => (
				<span
					key={company.name}
					className="trusted__logo"
					style={{
						fontFamily: company.fontFamily,
						fontWeight: company.fontWeight,
					}}
				>
					{company.name}
				</span>
			))}
		</div>
	);
}

export default function TrustedBy() {
	return (
		<motion.section
			className="trusted"
			data-navbar-theme="dark"
			initial={{ y: INTRO_BOTTOM_Y }}
			animate={{ y: 0 }}
			transition={{
				duration: INTRO_BOTTOM_DURATION,
				ease: INTRO_EASE,
				delay: INTRO_REST_DELAY,
			}}
		>
			<div className="trusted__inner">
				<div className="trusted__marquee">
					<div className="trusted__track">
						<CompanyGroup />
						<CompanyGroup />
					</div>
				</div>
			</div>
		</motion.section>
	);
}
