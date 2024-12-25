import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface ModalWrapperProps {
  buttonTitle: string;
  title: string;
  description?: string;
  children: ReactNode;
}

const ModalWrapper = ({
  buttonTitle,
  title,
  description,
  children,
}: ModalWrapperProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="rounded-lg" size={"lg"}>
          {buttonTitle}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description ?? ""}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalWrapper;
