import { JSX } from "react";
import {
  CoinsIcon,
  HomeIcon,
  ShieldPlusIcon,
  WorkflowIcon,
} from "lucide-react";

interface SidebarItemIconProps {
  isActive: boolean;
}
export type SidebarItemIcon = (
  props: SidebarItemIconProps
) => JSX.Element;

export interface SidebarItem {
  id: string;
  label: string;
  pathname: string;
  icon: SidebarItemIcon;
}

export const sidebarItems: SidebarItem[] = [
  {
    id: "home",
    label: "Home",
    pathname: "/",
    icon: () => <HomeIcon />,
  },
  {
    id: "workflow",
    label: "Workflows",
    pathname: "/workflows",
    icon: () => <WorkflowIcon />,
  },
  {
    id: "credentials",
    label: "Credentials",
    pathname: "/credentials",
    icon: () => <ShieldPlusIcon />,
  },
  {
    id: "billing",
    label: "Billing",
    pathname: "/billing",
    icon: () => <CoinsIcon />,
  },
] as const;
