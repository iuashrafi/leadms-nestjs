import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { navLinkType } from "@/types/navbar";

const NavLinkButton = ({ navLink }: { navLink: navLinkType }) => {
  const { label, Icon, href } = navLink;
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="cursor-pointer" scroll={true}>
      <div className="relative">
        <Button
          className={`flex justify-start cursor-pointer md:items-center px-2 md:px-4 gap-2 md:py-5 text-md font-normal min-h-[44px] md:min-h-[40px] rounded-md  
      transition-colors duration-300  w-full md:w-fit text-black md:text-app-gray-600 shadow-none text-[15px]  ${
        isActive
          ? " xl:text-black shadow-freelancer bg-gray-200/60 md:bg-transparent hover:md:bg-transparent hover:bg-gray-200/70"
          : " text-gray-600  hover:text-black bg-transparent hover:bg-transparent"
      }`}
        >
          <span className="p-2 md:p-0 bg-[#186B641A] md:bg-transparent rounded-[6px]">
            {Icon && <Icon strokeWidth={2.5} />}
          </span>
          <p>{label}</p>
        </Button>

        {isActive && (
          <div className="bg-black  h-1 rounded-t-sm hidden md:block absolute w-full bottom-[-8px]" />
        )}
      </div>
    </Link>
  );
};

export default NavLinkButton;
