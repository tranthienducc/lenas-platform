import { Link } from "@tanstack/react-router";
import { navigation } from "@/config/router/index";
import { ModeToggle } from "@/components/ModeToggle";
import { useTheme } from "@/providers/theme-providers";

const Header = () => {
  const { theme } = useTheme();

  return (
    <header className="relative z-20 flex items-center justify-between pt-7">
      <div className="flex flex-row items-center gap-2">
        <img
          src={
            theme === "dark"
              ? "/assets/icons/logo-dark.svg"
              : "/assets/icons/logo-light.svg"
          }
          alt="logo"
          className="size-8"
        />
        <span className="text-xl font-semibold">lenas</span>
      </div>

      <nav className="hidden lg:block absolute left-[50%] top-[50%] transform translate-x-[-50%]">
        <ul className="flex flex-row items-center justify-center gap-8 cursor-pointer">
          {navigation.map((data) => (
            <Link
              key={data.href}
              href={data.href}
              className="text-sm font-normal duration-300 text-grayLight dark:text-grayDark dark:hover:text-white hover:text-black"
            >
              {data.label}
            </Link>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="p-2 px-4 text-sm font-medium text-white rounded-md bg-primary hover:bg-primary/80 dark:text-black"
        >
          Login
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
