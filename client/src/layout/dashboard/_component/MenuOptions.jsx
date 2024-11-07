import { Separator } from "@/components/ui/separator";

import ComboboxAgency from "@/layout/dashboard/_component/ComboboxAgency";
import DashboardLink from "@/layout/dashboard/_component/DashboardLink";
import { Link } from "@tanstack/react-router";

import PropTypes from "prop-types";

const MenuOptions = ({ users, details, sidebarLogo, subaccounts }) => {
  return (
    <aside className="fixed left-0 z-20 flex flex-col w-full h-full bg-[#080808] border-r inset-y max-w-60">
      <div className="px-3 py-6 mb-2">
        <Link to="/" aria-label="Home" className="flex items-center gap-3">
          <img
            src={sidebarLogo}
            alt="logo-agency"
            loading="lazy"
            className="size-16"
          />
          <h4 className="text-4xl font-semibold">{details?.name}</h4>
        </Link>
      </div>

      <ComboboxAgency
        details={details}
        subaccounts={subaccounts}
        users={users}
      />

      <Separator className="my-4 bg-white/25" />
      <DashboardLink />
    </aside>
  );
};

export default MenuOptions;

MenuOptions.propTypes = {
  users: PropTypes.any,
  details: PropTypes.any,
  sidebarLogo: PropTypes.any,
  subaccounts: PropTypes.any,
};
