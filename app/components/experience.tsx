interface Experience {
  title: string;
  company: string;
  period:
    | `${string} ${number} - ${string} ${number}`
    | `${string} ${number} - Present`;
}

const experiences: Experience[] = [
  {
    title: "Senior Software Engineer",
    company: "Webflow",
    period: "March 2025 - Present",
  },
  {
    title: "Senior Software Engineer, Frontend",
    company: "Spotify (Contract)",
    period: "July 2024 - December 2024",
  },
  {
    title: "Senior Software Engineer, Fullstack",
    company: "Chief Inc.",
    period: "November 2022 - March 2025",
  },
  {
    title: "Lead Frontend Engineer",
    company: "FIS Global (Contract)",
    period: "April 2022 - November 2022",
  },
  {
    title: "Senior Frontend Engineer",
    company: "FIS Global (Contract)",
    period: "July 2021 - April 2022",
  },
  {
    title: "Fullstack Software Engineer",
    company: "The Home Depot",
    period: "July 2018 - March 2021",
  },
  {
    title: "Apprentice Software Engineer",
    company: "The Home Depot",
    period: "February 2017 - July 2018",
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
