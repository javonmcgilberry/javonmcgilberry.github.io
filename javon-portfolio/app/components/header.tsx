import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white shadow-sm fade-in-down">
      <div className="lg:container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="w-full sm:w-1/2 flex justify-center sm:justify-start mb-4 sm:mb-0">
            <Image
              src="/ligature.png"
              alt="Javon McGilberry Ligature Logo"
              width={100}
              height={100}
            />
          </div>
          <div className="w-full sm:w-1/2 flex justify-between items-center">
            <div className="hidden sm:block text-sm text-gray-600">
              Based in Atlanta, Georgia - US
            </div>
            <div className="hidden md:flex items-center border border-[#d9d9d9] rounded-full px-3 py-2 gap-2">
              <div className="w-2 h-2 bg-[#2d9c4c] rounded-full animate-pulse"></div>
              <div className="text-xs text-[#262626] font-['Inter_Tight',sans-serif] leading-[130%]">
                Available for Freelance
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
