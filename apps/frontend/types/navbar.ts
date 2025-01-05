import { LucideProps } from "lucide-react";

export type navLinkType = {
  id: string;
  label: string;
  href: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};
