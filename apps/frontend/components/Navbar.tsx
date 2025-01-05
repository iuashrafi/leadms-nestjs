"use client";
import Link from "next/link";
import Image from "next/image";
import NavLinkButton from "./NavLinkButton";
import { NavLinkData } from "@/utils/navbar";
import { Fragment } from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b px-4 flex backdrop-blur bg-white/10 min-h-[56px]">
      <section className="w-[80%] mx-auto flex items-center  gap-12">
        <div>
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={30} height={30} />
          </Link>
        </div>

        <div className="hidden lg:flex gap-2">
          {NavLinkData.map((navLink) => (
            <Fragment key={navLink.id}>
              <NavLinkButton navLink={navLink} />
            </Fragment>
          ))}
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
