import { useGetAuthUserDetail } from "@/lib/tanstack-query/queries";

import PropTypes from "prop-types";
import MenuOptions from "@/layout/dashboard/_component/MenuOptions";

const DashboardSideBar = ({ id, type }) => {
  const { data: users } = useGetAuthUserDetail();
  if (!users?.agency) return;

  const details =
    type === "agency"
      ? users?.agency
      : users?.agency?.SubAccount?.find((subaccount) => subaccount?.id === id);

  if (!details) return;
  const isWhiteLabelAgency = users?.agency?.whiteLabel;

  let sideBarLogo =
    users?.agency.agencyLogo || "/assets/images/avatar-user.png";

  if (type === "subaccount" && !isWhiteLabelAgency) {
    const subAccount = users?.[0].agency.SubAccount?.find(
      (subaccount) => subaccount.id === id
    );
    sideBarLogo = subAccount?.subAccountLogo;
  }

  const subaccounts = users?.agency?.SubAccount?.filter((subaccount) =>
    users?.Permissions?.find(
      (permission) =>
        permission?.subAccountId === subaccount?.id && permission?.access
    )
  );

  return (
    <>
      <MenuOptions
        details={details}
        sidebarLogo={sideBarLogo}
        subaccounts={subaccounts}
        users={users}
      />
    </>
  );
};

export default DashboardSideBar;

DashboardSideBar.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
};
