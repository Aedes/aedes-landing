import { useCallback, useEffect, useRef } from "react";
import "./FitText.css";

type FitTextProps = {
	children: string;
	className?: string;
	maxSize?: number;
};

export default function FitText({
	children,
	className = "",
	maxSize = 600,
}: FitTextProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLParagraphElement>(null);

	const fit = useCallback(() => {
		const container = containerRef.current;
		const text = textRef.current;
		if (!container || !text) return;

		const maxWidth = container.clientWidth;
		if (maxWidth === 0) return;

		let min = 8;
		let max = maxSize;

		while (min < max) {
			const mid = Math.ceil((min + max) / 2);
			text.style.fontSize = `${mid}px`;

			if (text.scrollWidth > maxWidth) {
				max = mid - 1;
			} else {
				min = mid;
			}
		}

		text.style.fontSize = `${max}px`;
	}, [maxSize]);

	useEffect(() => {
		fit();

		const observer = new ResizeObserver(fit);
		const container = containerRef.current;

		if (container) observer.observe(container);

		return () => observer.disconnect();
	}, [fit, children]);

	return (
		<div ref={containerRef} className={`fit-text ${className}`.trim()}>
			<p ref={textRef} className="fit-text__inner">
				{children}
			</p>
		</div>
	);
}
