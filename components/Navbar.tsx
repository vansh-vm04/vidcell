import React from "react";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="px-6 py-4  flex-between flex-nowrap  fixed z-50 w-full bg-dark-1 lg:px-10">
      <Link href="/" className="flex items-center justify-center gap-2">
        <Image
          className="max-sm:size-10"
          src="/icons/logo.svg"
          alt="logo"
          width={44}
          height={44}
        ></Image>
        <p className="text-3xl font-bold font-serif text-white max-sm:hidden">
          VidCell
        </p>
      </Link>

      <div className="flex-between gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
