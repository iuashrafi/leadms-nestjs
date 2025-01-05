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
          className={`flex justify-start cursor-pointer lg:items-center px-2 lg:px-4 gap-2 lg:py-5 text-md font-normal min-h-[44px] lg:min-h-[40px] rounded-lg  
      transition-colors duration-300 bg-transparent hover:bg-transparent w-full lg:w-fit text-black lg:text-app-gray-600 shadow-none text-[15px]  ${
        isActive
          ? " xl:text-black shadow-freelancer"
          : " text-gray-600  hover:text-black"
      }`}
        >
          <span className="p-2 lg:p-0 bg-[#186B641A] lg:bg-transparent rounded-[6px]">
            {Icon && <Icon strokeWidth={2.5} />}
          </span>
          <p>{label}</p>
        </Button>

        {isActive && (
          <div className="bg-black  h-1 rounded-t-sm hidden lg:block absolute w-full bottom-[-8px]" />
        )}
      </div>
    </Link>
  );
};

export default NavLinkButton;
