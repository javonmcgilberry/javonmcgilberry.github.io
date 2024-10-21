import Image from "next/image";

const socialLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/javon.chy",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/veezwashere",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/javonmcgilberry",
  },
];

export default function Contact() {
  return (
    <section className="fade-in-down py-16 pt-0">
      <div className="container mx-auto py-[24px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="block-80-width">
            <div className="flex items-center gap-4">
              <Image
                src="/full-ligature.png"
                alt="Profile"
                className="h-24 w-24"
                width={100}
                height={100}
              />
              <div className="flex flex-col gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link hover:text-gray-600"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-semi-bold">
                Don&apos;t be shy! Let&apos;s connect to make something special
              </div>
              <div className="relative inline-block">
                <a
                  href="mailto:javon@javonm.com"
                  className="relative inline-block text-2xl text-gray-600 transition-colors duration-300 after:absolute after:bottom-[-4] after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:transform after:bg-gray-600 after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  javon@javonm.com
                </a>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-4">
                {/* Uncomment and adjust these links as needed */}
                {/* <a href="/info/changelog" className="footer-link">Changelog</a>
                  <a href="/info/style-guide" className="footer-link">Style Guide</a>
                  <a href="/info/licenses" className="footer-link">Licenses</a>
                  <a href="http://webflow.com" target="_blank" rel="noopener noreferrer" className="footer-link">Webflow</a> */}
              </div>
              <div className="text-sm text-gray-500">©2023</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
