import { Link } from "@tanstack/react-router";
import { ModeToggle } from "@/components/ModeToggle";
import { useTheme } from "@/providers/theme-providers";
import { useUser } from "@/context/UserProvider";
import PopoverUser from "@/components/common/PopoverUser";
import { navigation } from "@/config/router";

const Header = () => {
  const { theme } = useTheme();
  const { user } = useUser();

  return (
    <header className="fixed top-0 z-20 flex flex-row items-center justify-between w-full max-w-full px-24 pt-4 bg-transparent backdrop-blur-sm">
      <Link to="/" className="flex flex-row items-center gap-2">
        <img
          src={
            theme === "dark"
              ? "/assets/icons/logo-dark.svg"
              : "/assets/icons/logo-light.svg"
          }
          alt="logo"
          className="size-16"
        />
      </Link>

      <nav className="hidden lg:block absolute left-[50%] top-[50%] transform translate-x-[-50%]">
        <ul className="flex flex-row items-center justify-center gap-8 cursor-pointer">
          {navigation.map((data) => (
            <Link
              key={data.href}
              to={data.href}
              className="text-sm font-normal duration-300 text-grayLight dark:text-grayDark dark:hover:text-white hover:text-black"
            >
              {data.label}
            </Link>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        {user ? (
          <>
            <Link
              to="/dashboard"
              className="px-3 py-1 border rounded-lg border-white/15 bg-inherit"
            >
              <span className="text-sm font-medium text-black dark:text-white">
                Dashboard
              </span>
            </Link>
            <PopoverUser user={user} />
          </>
        ) : (
          <Link
            to="/login"
            className="p-2 px-4 text-sm font-medium text-white rounded-md bg-primary hover:bg-primary/80 dark:text-black"
          >
            Login
          </Link>
        )}

        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
