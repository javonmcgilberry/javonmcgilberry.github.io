import React from "react";

const primarySkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "GraphQL",
];

export default function About() {
  return (
    <div>
      <h2 className="mb-6 text-base font-semi-bold">About</h2>
      <div className="space-y-6 font-['Inter_Tight',sans-serif] text-2xl leading-[140%] text-[#262626]">
        <p>
          I&apos;m <strong>Javon McGilberry</strong>, a Senior Software Engineer
          based in Atlanta, Georgia. With over <strong>7 years</strong> of
          experience in designing, developing, and optimizing web applications,
          I specialize in{" "}
          {primarySkills.map((skill, index) => (
            <React.Fragment key={skill}>
              <strong>{skill}</strong>
              {index < primarySkills.length - 1 && ", "}
              {index === primarySkills.length - 2 && "and "}
            </React.Fragment>
          ))}
          . My unique blend of technical expertise and a background in{" "}
          <em>Art &amp; Design</em> allows me to create seamless,
          high-performing digital experiences that exceed client expectations.
          I&apos;m passionate about helping designers, creatives, and small
          business owners bring their visions to life online.
        </p>
        <p>
          When I&apos;m not coding, you&apos;ll find me traveling,
          photographing, playing guitar, or exploring new restaurants.
        </p>
        <p>Check out my work history below!</p>
        <div className="mt-6">
          <a
            href="/javon_mcgilberry_resume.pdf"
            className="inline-block rounded-full border border-[#d9d9d9] bg-white px-4 py-3 font-['Inter_Tight',sans-serif] text-base font-normal leading-[120%] text-[#262626] transition-colors hover:bg-gray-50"
          >
            View Resume
          </a>
        </div>
      </div>
    </div>
  );
}
