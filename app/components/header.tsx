import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white">
      <div className="fade-in-down container mx-auto py-[24px]">
        <div className="flex flex-col items-center sm:flex-row">
          <div className="mb-4 flex w-full sm:mb-0 sm:w-1/2 sm:justify-start">
            <Image
              src="/ligature.png"
              alt="Javon McGilberry Ligature Logo"
              width={100}
              height={100}
            />
          </div>
          <div className="flex w-full items-center justify-between sm:w-1/2">
            <div className="hidden text-sm text-gray-600 sm:block">
              Based in Atlanta, Georgia - US
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-[#d9d9d9] px-3 py-2 md:flex">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#2d9c4c]"></div>
              <div className="font-['Inter_Tight',sans-serif] text-xs leading-[130%] text-[#262626]">
                Available for Freelance
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
