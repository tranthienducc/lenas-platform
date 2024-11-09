import { ChatBubbleIcon } from "@radix-ui/react-icons";
import {
  Book,
  Bot,
  Clapperboard,
  Container,
  Dock,
  Filter,
  PanelLeftDashed,
  Phone,
  Receipt,
  Settings,
  Settings2,
  SquareTerminal,
  Users2,
} from "lucide-react";

export const navigation = [
  {
    title: "Draw",
    href: "/features/draw",
    description: "Draw wireframe by drawing tool",
  },
  {
    title: "Feature 2",
    href: "/features/feature-2",
    description: "Description for Feature 2",
  },
  {
    title: "Feature 3",
    href: "/features/feature-3",
    description: "Description for Feature 3",
  },
];

export const navLinks = [
  {
    label: "Launchpad",
    path: "/dashboard/$id/launchpad",
    icon: <Book className="size-5" />,
  },
  {
    label: "All subaccount",
    path: "/dashboard/$id/all-subaccount",
    icon: <Users2 className="size-5" />,
  },
  {
    label: "AI",
    path: "/dashboard/$id/ai",
    icon: <Bot className="size-5" />,
  },
  {
    label: "Chat team",
    path: "/dashboard/$id/chat-team",
    icon: <ChatBubbleIcon className="size-5" />,
  },
  {
    label: "Billing",
    path: "/dashboard/$id/billing",
    icon: <Receipt className="size-5" />,
  },
  {
    label: "Dashboard",
    path: "/dashboard/$id/dashboard-manage",
    icon: <SquareTerminal className="size-5" />,
  },
  {
    label: "Settings",
    path: "/dashboard/$id/setting",
    icon: <Settings2 className="size-5" />,
  },
  {
    label: "Dashboard",
    path: "/subaccount/$id/dashboard",
    icon: <PanelLeftDashed className="size-5" />,
  },
  {
    label: "Piplines",
    path: "/subaccount/$id/pipelines",
    icon: <Container className="size-5" />,
  },
  {
    label: "Launchpad",
    path: "/subaccount/$id/launchpad",
    icon: <Dock className="size-5" />,
  },
  {
    label: "Contact",
    path: "/subaccount/$id/contact",
    icon: <Phone className="size-5" />,
  },
  {
    label: "Funnels",
    path: "/subaccount/$id/funnels",
    icon: <Filter className="size-5" />,
  },
  {
    label: "Media",
    path: "/subaccount/$id/media",
    icon: <Clapperboard className="size-5" />,
  },
  {
    label: "Setting",
    path: "/subaccount/$id/setting",
    icon: <Settings className="size-5" />,
  },
];
