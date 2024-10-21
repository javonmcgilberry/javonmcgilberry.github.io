interface Experience {
  title: string;
  company: string;
  period: string;
}

const experiences: Experience[] = [
  {
    title: "Senior Frontend Software Engineer",
    company: "Spotify (Contract)",
    period: "July 2024 - Nov 2024",
  },
  {
    title: "Senior Fullstack Software Engineer",
    company: "Chief Inc.",
    period: "November 2022 - Present",
  },
  {
    title: "Lead Frontend Software Engineer",
    company: "FIS Global (Contract)",
    period: "April 2022 - November 2022",
  },
  {
    title: "Senior Frontend Software Engineer",
    company: "FIS Global (Contract)",
    period: "July 2021 - March 2022",
  },
  {
    title: "Fullstack Software Engineer",
    company: "The Home Depot",
    period: "February 2017 - February 2021",
  },
];

export default function Experience() {
  return (
    <div>
      <h2 className="mb-6 text-base font-semi-bold">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="font-semi-bold">
              {exp.title} - {exp.company}
            </div>
            <div className="text-gray-600">{exp.period}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
