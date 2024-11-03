"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <div className="items-center flex justify-center ">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger-logo"
            width={36}
            height={36}
            className="sm:hidden"
          ></Image>
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <Link href="/" className="flex items-center justify-left gap-2">
            <Image
              className="max-sm:size-10"
              src="/icons/logo.svg"
              alt="logo"
              width={44}
              height={44}
            ></Image>
            <p className="text-3xl font-bold font-serif text-white ">VidCell</p>
          </Link>

          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex flex-col h-full gap-6 pt-16 text-white bg-dark-1 p-0">
                <div className="flex flex-1 flex-col gap-6">
                  {sidebarLinks.map((link) => {
                    const isActive: boolean =
                      pathname === link.route ||
                      pathname.startsWith(`${link.route}/`);
                    return (
                      <SheetClose asChild key={link.label}>
                        <Link
                          href={link.route}
                          key={link.label}
                          className={cn(
                            "flex gap-4 items-center p-3  rounded-lg text-white  w-full",
                            { "bg-blue-600": isActive }
                          )}
                        >
                          <Image
                            src={link.imgUrl}
                            alt={link.label}
                            width={20}
                            height={20}
                          />
                          <p className="text-white  font-semibold">
                            {link.label}
                          </p>
                        </Link>
                      </SheetClose>
                    );
                  })}
                </div>
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
