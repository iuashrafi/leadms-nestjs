"use client";
import { Fragment, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import NavLinkButton from "./NavLinkButton";
import { NavLinkData } from "@/utils/navbar";

const Navbar = () => {
  const [showNavbarDropDown, setShowNavbarDropDown] = useState<boolean>(false);

  const handleMenuClick = () => {
    setShowNavbarDropDown((prev) => !prev);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b px-4 flex backdrop-blur bg-white/10 min-h-[56px]">
      <section className="w-full md:container mx-auto md:px-6 lg:px-8 xl:px-16 flex items-center  justify-between  md:justify-normal  gap-12">
        <div>
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={30} height={30} />
          </Link>
        </div>

        {/* desktop navbar */}
        <div className="hidden md:flex gap-2">
          <NavLinkItems />
        </div>

        {/* mobile navbar */}
        {showNavbarDropDown && (
          <div
            className={`w-[100vw] bg-neutral-100 h-fit top-[58px] left-0 right-0 z-[-1] flex flex-col gap-1 md:hidden shadow-xl rounded-b-xl px-2  sm:px-6  py-4 absolute`}
          >
            <NavLinkItems />
          </div>
        )}

        <div
          className="flex md:hidden items-center justify-end rounded-full w-[50px] h-[50px] cursor-pointer"
          onClick={handleMenuClick}
        >
          {showNavbarDropDown ? (
            <X strokeWidth={2.5} />
          ) : (
            <Menu strokeWidth={2.5} />
          )}
        </div>
      </section>
    </nav>
  );
};

const NavLinkItems = () => {
  return (
    <>
      {NavLinkData.map((navLink) => (
        <Fragment key={navLink.id}>
          <NavLinkButton navLink={navLink} />
        </Fragment>
      ))}
    </>
  );
};

export default Navbar;
