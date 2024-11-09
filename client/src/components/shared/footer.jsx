import { footerData } from "@/constants";
import { useTheme } from "@/providers/theme-providers";
import { Link } from "@tanstack/react-router";
import { Dot } from "lucide-react";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="my-[21%] relative pb-[90px] px-32">
      <div className="absolute inset-0 z-0 bg-center bg-cover bg-hero-pattern-bottom rounded-br-[10px]"></div>
      <nav className="flex flex-col flex-wrap justify-between w-full">
        <div className="grid w-full grid-cols-footer">
          {Object.entries(footerData).map(([sectionTitle, links]) => (
            <div key={sectionTitle}>
              <h3 className="mb-3 text-sm font-medium">
                {sectionTitle.charAt(0).toUpperCase() + sectionTitle.slice(1)}
              </h3>
              <ul className="p-0 m-0 list-none">
                {links.map((link) => (
                  <li key={link.path} className="py-[6px] px-0">
                    <Link
                      href={link.path}
                      className="flex items-center gap-2 hover:text-black dark:hover:text-white"
                    >
                      {link.icon}
                      <span className="text-sm font-medium text-grayLight dark:text-grayDark">
                        {link.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <Link href="/" className="flex items-start justify-start gap-2">
            <img
              src={
                theme === "dark"
                  ? "/assets/icons/logo-dark.svg"
                  : "/assets/icons/logo-light.svg"
              }
              alt="logo"
              className="size-24"
            />
          </Link>
        </div>

        <div className="flex flex-row items-center justify-between">
          <span className="text-sm font-medium text-grayLight dark:text-grayDark">
            @2024 luma. Uncoypright
          </span>

          <div className="flex flex-row items-center gap-0">
            <Dot className="text-blue-500 size-16" />
            <span className="text-sm font-medium text-blue-500">
              All Systems normal
            </span>
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
