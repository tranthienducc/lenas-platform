import { navLinks } from "@/config/router";
import { cn } from "@/lib/utils";
import { Link, useParams, useRouterState } from "@tanstack/react-router";

const DashboardLink = () => {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { id } = useParams({ strict: false });
  const pageTypes = pathname.startsWith("/dashboard")
    ? "dashboard"
    : pathname.startsWith("/subaccount")
      ? "subaccount"
      : "other";

  const filterSidebar = navLinks.filter((link) => {
    switch (pageTypes) {
      case "dashboard":
        return link.path.startsWith("/dashboard");
      case "subaccount":
        return link.path.startsWith("/subaccount");

      default:
        return null;
    }
  });
  return (
    <nav className="grid gap-4 p-2">
      {filterSidebar.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={cn(
            "px-4 py-2 rounded-lg duration-300 flex flex-row items-center gap-3",
            pathname === link.path.replace("$id", id)
              ? "bg-grayLight dark:bg-white/30"
              : "hover:bg-grayLight dark:hover:bg-grayDark text-grayLight dark:text-grayDark hover:dark:text-black"
          )}
        >
          {link.icon}
          <span className="text-sm font-medium">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default DashboardLink;
