import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white" aria-label="Main site header">
      <div className="container mx-auto py-[24px]">
        <div className="flex flex-col items-center sm:flex-row">
          <div className="mb-4 flex w-full sm:mb-0 sm:w-1/2 sm:justify-start">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src="/ligature.png"
                alt=""
                width={100}
                height={100}
                aria-hidden="true"
                priority
                sizes="100px"
              />
            </Link>
            <h1 className="sr-only">
              Javon McGilberry - Senior Full Stack Software Engineer
            </h1>
          </div>
          <div className="flex w-full items-center justify-between gap-6 sm:w-1/2">
            <nav
              className="flex items-center gap-4 text-sm text-[#4f4f4f]"
              aria-label="Primary"
            >
              <Link
                href="/"
                className="transition-colors hover:text-[#111111] focus-visible:text-[#111111]"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="transition-colors hover:text-[#111111] focus-visible:text-[#111111]"
              >
                Blog
              </Link>
            </nav>
            <div
              className="hidden rounded-full border border-[#d9d9d9] px-3 py-2 md:flex"
              aria-label="Location"
            >
              <div className="font-['Inter_Tight',sans-serif] text-xs leading-[130%] text-[#262626]">
                Based in Atlanta, GA
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
