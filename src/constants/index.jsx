import {
  Construction,
  Database,
  LayoutTemplate,
  MonitorSmartphone,
} from "lucide-react";

export const partners = [
  {
    path: "/assets/images/logo-partner-1.svg",
  },
  {
    path: "/assets/images/logo-partner-2.svg",
  },
  {
    path: "/assets/images/logo-partner-3.svg",
  },
  {
    path: "/assets/images/logo-partner-4.svg",
  },
  {
    path: "/assets/images/logo-partner-5.svg",
  },
];

export const features = [
  {
    Icon: LayoutTemplate,
    name: "Teamplates",
    description: "We create many template all kind.",
    href: "/",
    cta: "See more",
    className: "col-span-1",
    background: (
      <img
        src="/assets/images/bg-img.jpg"
        className="absolute object-cover w-full h-full opacity-60"
        alt="bg"
        loading="lazy"
      />
    ),
  },

  {
    Icon: Database,
    name: "CMS",
    description: "Manage and generate blog site.",
    href: "/",
    cta: "See more",
    className: "col-span-2",
    background: (
      <img
        src="/assets/images/bg-img.jpg"
        className="absolute object-cover w-full h-full opacity-60"
        alt="bg"
        loading="lazy"
      />
    ),
  },
  {
    Icon: MonitorSmartphone,
    name: "Dynamic Resources",
    description: "Responsive for your websites.",
    href: "/",
    cta: "See more",
    className: "col-span-2",
    background: (
      <img
        src="/assets/images/bg-img.jpg"
        className="absolute object-cover w-full h-full opacity-60"
        alt="bg"
        loading="lazy"
      />
    ),
  },
  {
    Icon: Construction,
    name: "Coming soon",
    description: "We have a secret feature that will be released soon",
    href: "/",
    cta: "Learn more",
    className: "col-span-1",

    background: (
      <img
        src="/assets/images/bg-img.jpg"
        className="absolute object-cover w-full h-full opacity-60"
        alt="bg"
        loading="lazy"
      />
    ),
  },
];

export const contentData = {
  "ai-app": {
    title: "lenas",
    content:
      "build times went from 7m to 40s.vercel-ai SDK saw a 95% reduction in page loadtimes. lenas logo saw 24x faster builds.",
  },
  "web-app": {
    title: "React",
    content:
      "saw 6x faster builds & deployment. chick-fil-a Logo builds decreased by 99.96%.neo Logo saw 50% reduction in infra admin effort.",
  },
  ecommerce: {
    title: "Stripe",
    content:
      "saw 100% uptime during Black Friday. box Logo saw 300% more pageviews. hydrow Logo improved Core Web Vitals by 50%.",
  },
  marketing: {
    title: "Threads",
    content:
      "gained 300% more organic clicks. sonos Logo saved 1 year of developer time. chicos Logo saw 98% faster build times.",
  },
  platforms: {
    title: "Vercel",
    content:
      "serves thousands of domains from 1 code base. hashnode Logo page load decreased by 5%. zapier Logo saw 24x faster builds.",
  },
};
