"use client"
import React, { Children } from "react";
import { ReactNode } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  title: string;
  buttonText?: string;
  handleClick?: () => void;
  image?: string;
  buttonIcon?: string;
  children?: ReactNode;
}

const MeetingModal = ({
  isOpen,
  onClose,
  className,
  children,
  title,
  buttonText,
  handleClick,
  image,
  buttonIcon
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="flex w-full max-w-[520px] bg-dark-1
      text-white gap-6 flex-col px-6 py-9 border-none rounded-[14px]"
      >
        <div className="flex flex-col items-center justify-center gap-6">
           {image && (
            <div>
              <Image src={image} alt="image" width={72} height={72}></Image>
            </div>
           )}
           <h1 className={cn('text-2xl font-bold leading-[42px]',className)}>{title}</h1>
           {children}
           <Button className="bg-blue-1 text-lg focus-visible:ring-0 focus-visible:ring-offset-0 flex gap-2" onClick={handleClick}>
            {buttonIcon && <Image src={buttonIcon} alt="image" width={24} height={24}></Image>}
            {buttonText}
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
