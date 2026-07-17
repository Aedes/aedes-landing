import { useEffect, useRef, useState, type ReactNode } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame } from "motion";
import "lenis/dist/lenis.css";

type SmoothScrollProps = {
	children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
	const lenisRef = useRef<LenisRef>(null);
	const [enabled, setEnabled] = useState(true);

	useEffect(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => setEnabled(!media.matches);

		sync();
		media.addEventListener("change", sync);
		return () => media.removeEventListener("change", sync);
	}, []);

	useEffect(() => {
		if (!enabled) return;

		const update = ({ timestamp }: { timestamp: number }) => {
			lenisRef.current?.lenis?.raf(timestamp);
		};

		frame.update(update, true);
		return () => cancelFrame(update);
	}, [enabled]);

	if (!enabled) {
		return children;
	}

	return (
		<>
			<ReactLenis
				root
				ref={lenisRef}
				options={{
					autoRaf: false,
					// Sensación más “pesada” / inercial con mouse
					duration: 1.4,
					lerp: 0.07,
					smoothWheel: true,
					wheelMultiplier: 0.75,
					touchMultiplier: 1.1,
					anchors: {
						// Compensa la navbar fija al saltar a secciones
						offset: -80,
					},
				}}
			/>
			{children}
		</>
	);
}
