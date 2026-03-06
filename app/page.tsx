import Contact from "./components/contact";
import Details from "./components/details";
import Divider from "./components/divider";
import Header from "./components/header";
import Hero from "./components/hero";
import LatestWriting from "./components/latest-writing";
import Reveal from "./components/reveal";

export default function Home() {
  return (
    <main>
      <Reveal direction="down">
        <Header />
      </Reveal>
      <Reveal className="relative">
        <Hero />
      </Reveal>
      <Reveal direction="down">
        <Divider />
      </Reveal>
      <Reveal direction="down">
        <Details />
      </Reveal>
      <Reveal direction="down">
        <Divider />
      </Reveal>
      <Reveal direction="down">
        <LatestWriting />
      </Reveal>
      <Reveal direction="down">
        <Divider />
      </Reveal>
      <Reveal direction="down">
        <Contact />
      </Reveal>
    </main>
  );
}
