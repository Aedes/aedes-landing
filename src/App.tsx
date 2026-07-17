import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import Services from "./components/Services";
import Projects from "./components/Projects";
import HowWeWork from "./components/HowWeWork";
import Team from "./components/Team";
import BuildTogether from "./components/BuildTogether";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";

export default function App() {
	return (
		<SmoothScroll>
			<Navbar />
			<main>
				<Hero />
				<TrustedBy />
				<Services />
				<Projects />
				<HowWeWork />
				<Team />
				<BuildTogether />
			</main>
			<Footer />
		</SmoothScroll>
	);
}
