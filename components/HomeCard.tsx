"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HomeCardProps {
  className: string;
  title: string;
  description: string;
  img: string;
  handleClick: () => void;
}

const HomeCard = ({
  className,
  img,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <div
      className={cn(
        className,
        "flex flex-col justify-between px-4 py-6 sm:w-full min-h-[260px] xl:w-[270px] rounded-[14px] cursor-pointer"
      )}
      onClick={() => {
        handleClick();
      }}
    >
      <div className="flex-center glassmorphism rounded-[10px] size-12">
        <Image alt="add-meeting" width={27} height={27} src={img}></Image>
      </div>
      <div>
        <h1 className="font-semibold text-2xl">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
