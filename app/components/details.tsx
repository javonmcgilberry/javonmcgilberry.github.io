import About from "./about";
import Experience from "./experience";
export default function Details() {
  return (
    <section className="fade-in-down py-16 pt-0">
      <div className="container mx-auto py-[24px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Experience />
          <About />
        </div>
      </div>
    </section>
  );
}
