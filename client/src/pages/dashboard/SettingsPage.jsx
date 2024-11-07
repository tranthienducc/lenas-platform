import CreateAgencyForm from "@/components/forms/CreateAgencyForm";
import UserDetailsForms from "@/components/forms/UserDetailsForm";
import {
  useGetAgencyId,
  useGetAuthUserDetail,
} from "@/lib/tanstack-query/queries";
import { useParams } from "@tanstack/react-router";

const SettingsPage = () => {
  const { id } = useParams({ strict: false });
  const { data: userDetails } = useGetAuthUserDetail();
  const { data: agencyDetails } = useGetAgencyId(id);

  if (!agencyDetails) return null;

  if (!userDetails) return null;
  const subAccounts = agencyDetails?.SubAccount;

  return (
    <div className="flex lg:!flex-row flex-col gap-4">
      <CreateAgencyForm data={agencyDetails} />
      <UserDetailsForms
        type="agency"
        id={id}
        subAccounts={subAccounts}
        userData={userDetails}
      />
    </div>
  );
};

export default SettingsPage;
