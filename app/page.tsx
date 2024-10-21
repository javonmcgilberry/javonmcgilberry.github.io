import Header from "./components/header";
import Hero from "./components/hero";
import Details from "./components/details";
import Divider from "./components/divider";
import Contact from "./components/contact";
export const metadata = {
  title:
    "Javon McGilberry | Senior Full Stack Software Engineer in Atlanta, GA",
  description:
    "Experienced Senior Full Stack Software Engineer based in Atlanta, Georgia. Specializing in JavaScript, TypeScript, React, Node.js, and GraphQL. Helping designers, creatives, and small businesses bring their digital visions to life. Available for freelance projects.",
  image: "/graph-image.jpg",
};

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Divider />
      <Details />
      <Divider />
      <Contact />
    </div>
  );
}
