import { Link } from "@tanstack/react-router";
import { ModeToggle } from "@/components/ModeToggle";
import { useTheme } from "@/providers/theme-providers";
import { useUser } from "@/context/UserProvider";
import PopoverUser from "@/components/common/PopoverUser";
import { Store } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { navigation } from "@/config/router";

const Header = () => {
  const { theme } = useTheme();
  const { user } = useUser();

  const isAdmin = user?.app_metadata?.role;
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

      <Navbar />

      <div className="flex items-center gap-2">
        {user ? (
          <>
            {isAdmin ? (
              <Link
                to="/admin"
                className="px-3 py-1 border rounded-lg border-white/15 bg-inherit"
              >
                <span className="text-sm font-medium text-black dark:text-white">
                  Dashboard Admin
                </span>
              </Link>
            ) : (
              <Link
                to="/market-place"
                className="px-3 py-1 border rounded-lg border-white/15 bg-inherit"
              >
                <Store />
              </Link>
            )}
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

function Navbar() {
  return (
    <nav className="hidden lg:block absolute left-[50%] top-[50%] transform translate-x-[-50%]">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              to="/pricing"
              className="px-3 py-2 text-sm font-normal duration-300 text-grayLight dark:text-grayDark dark:hover:text-white hover:text-black"
            >
              Pricing
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm font-normal bg-transparent dark:text-grayDark">
              Feature
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {navigation.map((component) => (
                  <li key={component.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={component.href}
                        className="block p-3 space-y-1 leading-none no-underline transition-colors rounded-md outline-none select-none hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">
                          {component.title}
                        </div>
                        <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                          {component.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link
              to="/docs"
              className="px-3 py-2 text-sm font-normal duration-300 text-grayLight dark:text-grayDark dark:hover:text-white hover:text-black"
            >
              Docs
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link
              to="/changelog"
              className="px-3 py-2 text-sm font-normal duration-300 text-grayLight dark:text-grayDark dark:hover:text-white hover:text-black"
            >
              Changelog
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
