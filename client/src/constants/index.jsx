import Safari from "@/components/safari";
import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import {
  Blend,
  Bot,
  Eraser,
  GalleryHorizontal,
  Globe,
  Users2,
  Weight,
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
  {
    path: "/assets/images/logo-partner-5.svg",
  },
];

export const features = [
  {
    title: "Code Snippets Ready for Use",
    description:
      "Instantly integrate copy/paste-ready code into your projects, accelerating development without sacrificing quality.",
    className:
      "hover:bg-red-500/10 dark:hover:hover:bg-red-500/70 transition-all duration-500 ease-out border border-black/15 dark:border-white/5",
    content: (
      <>
        <Safari
          src="/assets/images/code.webp"
          url="https://acme.ai"
          className="-mb-32 mt-4 max-h-64 w-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] group-hover:translate-y-[-10px] transition-all duration-300"
        />
      </>
    ),
  },
  {
    title: "Simplified Validation Setup",
    description:
      "Easily implement powerful form validations with support for both Zod and Yup, ensuring data accuracy with minimal effort.",
    className:
      "order-3 xl:order-none hover:bg-blue-500/10 dark:hover:hover:bg-blue-500/70 transition-all duration-500 ease-out border border-black/15 dark:border-white/5",
    content: (
      <>
        <Safari
          src="/assets/images/validation.webp"
          url="https://acme.ai"
          className="-mb-32 mt-4 max-h-64 w-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] group-hover:translate-y-[-10px] transition-all duration-300"
        />
      </>
    ),
  },
  {
    title: "Comprehensive Component Library",
    description:
      "Access a complete set of pre-built components tailored for dynamic forms, saving you time and effort.",
    className:
      "md:row-span-2 hover:bg-orange-500/10 dark:hover:hover:bg-orange-500/70  transition-all duration-500 ease-out border border-black/15 dark:border-white/5",
    content: (
      <>
        <Safari
          src="/assets/images/customization.webp"
          url="https://acme.ai"
          className="-mb-48 ml-12 mt-16 h-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] group-hover:translate-x-[-10px] transition-all duration-300"
        />
      </>
    ),
  },
  {
    title: "Flexible Customization Options",
    description:
      "Customize form behavior effortlessly with support for Yup, server-side rendering, and other powerful tools.",
    className:
      "flex-row order-4 md:col-span-2 md:flex-row xl:order-none hover:bg-green-500/10 transition-all duration-500 ease-out dark:hover:hover:bg-green-500/70 border border-black/15 dark:border-white/5",
    content: (
      <>
        <Safari
          src="/assets/images/customization.webp"
          url="https://acme.ai"
          className="-mb-32 mt-4 max-h-64 w-full px-4 select-none drop-shadow-[0_0_28px_rgba(0,0,0,.1)] group-hover:translate-y-[-10px] transition-all duration-300"
        />
      </>
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

export const featuresData = [
  {
    icon: <Bot className="size-4" />,
    title: "AI-Powered Design",
    sub_title: "Using artificial intelligence to create stunning designs.",
    path: "/assets/images/ai-feature-img.png",
  },
  {
    icon: <Eraser className="size-4" />,
    title: "Interactive Drawing Tools",
    sub_title: "Use Excalidraw-like tools to create custom graphics.",
    path: "/assets/images/drawer-feature-img.png",
  },
  {
    icon: <Users2 className="size-4" />,
    title: "Team Collaboration",
    sub_title: "Manage your site with powerful controls and chat.",
    path: "/assets/images/chats-feature-img.png",
  },
  {
    icon: <Bot className="size-4" />,
    title: "E-commerce Integration",
    sub_title: "Manage your store web generater.",
    path: "/assets/images/ecommerce-feature-img.png",
  },
];

export const reliability = [
  {
    icon: <Weight className="size-4" />,
    title: "Elastic scalability",
    desc: "Handle unbelievable scale without a sweat, whether you’re on Fortune 500, or it’s your launch day.",
  },
  {
    icon: <Globe className="size-4" />,
    title: "Global performance",
    desc: "Automatically route traffic to over 100 edge locations around the globe, for a fast site, anywhere in the world.",
  },
  {
    icon: <Blend className="size-4" />,
    title: "Serverless Storage",
    desc: "Accelerate development with databases for the fastest frontends.",
  },
];

export const footerData = {
  products: [
    { path: "/ai", title: "AI" },
    { path: "/enterprise", title: "Enterprise" },
    { path: "/nextjs", title: "Next.js" },
    { path: "/observability", title: "Observability" },
    { path: "/previews", title: "Previews" },
    { path: "/rendering", title: "Rendering" },
    { path: "/security", title: "Security" },
    { path: "/turbo", title: "Turbo" },
    { path: "/v0", title: "v0" },
  ],
  resources: [
    { path: "/community", title: "Community" },
    { path: "/docs", title: "Docs" },
    { path: "/experts", title: "Experts" },
    { path: "/guides", title: "Guides" },
    { path: "/help", title: "Help" },
    { path: "/integrations", title: "Integrations" },
    { path: "/pricing", title: "Pricing" },
    { path: "/resources", title: "Resources" },
    { path: "/templates", title: "Templates" },
  ],
  company: [
    { path: "/about", title: "About" },
    { path: "/blog", title: "Blog" },
    { path: "/careers", title: "Careers" },
    { path: "/changelog", title: "Changelog" },
    { path: "/contact", title: "Contact Us" },
    { path: "/customers", title: "Customers" },
    { path: "/partners", title: "Partners" },
    { path: "/privacy", title: "Privacy Policy" },
    { path: "/legal", title: "Legal" },
  ],
  social: [
    {
      path: "https://github.com",
      title: "GitHub",
      icon: <GitHubLogoIcon className="size-3" />,
    },
    {
      path: "https://linkedin.com",
      title: "LinkedIn",
      icon: <LinkedInLogoIcon className="size-3" />,
    },
    {
      path: "https://twitter.com",
      title: "Twitter",
      icon: <TwitterLogoIcon className="size-3" />,
    },
    {
      path: "https://youtube.com",
      title: "YouTube",
      icon: <GalleryHorizontal className="size-3" />,
    },
  ],
};

export const addOnsProduct = [
  { title: "Priority Support", id: "prod_R6dz9wSTO7imIv" },
];

export const pricingCards = [
  {
    title: "Starter",
    description: "Perfect for trying out plura",
    price: "Free",
    duration: "",
    highlight: "Key features",
    features: ["3 Sub accounts", "2 Team members", "Unlimited pipelines"],
    priceId: "",
  },
  {
    title: "Unlimited Saas",
    description: "The ultimate agency kit",
    price: "$10.00",
    duration: "month",
    highlight: "Key features",
    features: ["Rebilling", "24/7 Support team"],
    priceId: "price_1QEMwQ0864nWPwutwRdifHUl",
  },
  {
    title: "Basic",
    description: "For serious agency owners",
    price: "$5.00",
    duration: "month",
    highlight: "Everything in Starter, plus",
    features: ["Unlimited Sub accounts", "Unlimited Team members"],
    priceId: "price_1QENQo0864nWPwutXRhNv6tu",
  },
];

export const TAG_COLORS = ["BLUE", "ORANGE", "PURPLE", "ROSE", "GREEN"];

export const defaultStyles = {
  backgroundPosition: "center",
  objectFit: "cover",
  backgroundRepeat: "no-repeat",
  textAlign: "left",
  opacity: "100%",
};
