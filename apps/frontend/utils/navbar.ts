import { navLinkType } from "@/types/navbar";
import { Layers, Phone, UserRoundPlus, UsersRound } from "lucide-react";

export const NavLinkData: navLinkType[] = [
  {
    id: "navLink1",
    href: "/",
    label: "Dashboard",
    Icon: Layers,
  },
  {
    id: "navLink2",
    href: "/leads",
    label: "Leads",
    Icon: UsersRound,
  },
  {
    id: "navLink3",
    href: "/staffs",
    label: "Staffs",
    Icon: UserRoundPlus,
  },
  {
    id: "navLink4",
    href: "/logs",
    label: "Call",
    Icon: Phone,
  },
];
