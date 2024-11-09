import CreateAgencyForm from "@/components/forms/CreateAgencyForm";
import {
  useGetAllAgency,
  useGetAuthUserDetail,
  useGetCollectSubAccount,
  useGetCurrentUser,
  useVerifyUserAcceptIn,
} from "@/lib/tanstack-query/queries";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";

const AgencyPage = () => {
  const { data: authUser } = useGetCurrentUser();
  const { data: agencies } = useGetAllAgency();
  const { data: agencyId } = useVerifyUserAcceptIn();
  const { data: user } = useGetAuthUserDetail();
  const { data: subAccount } = useGetCollectSubAccount(agencyId);
  const searchParams = useSearch({ strict: false });
  const navigate = useNavigate();

  const agencyInviteId = agencyId ? agencyId : agencies?.[0]?.id;

  console.log("subAccountId", agencies?.[0]?.SubAccount?.[0].id);

  useEffect(() => {
    if (agencyInviteId) {
      if (
        (user?.role === "SUBACCOUNT_GUEST") |
        (user?.role === "SUBACCOUNT_USER")
      ) {
        navigate({ to: `/subaccount/${agencies?.[0]?.SubAccount?.[0].id}` });
      } else if (
        user?.role === "AGENCY_OWNER" ||
        user?.role === "AGENCY_ADMIN"
      ) {
        if (searchParams.plan) {
          navigate({
            to: `/dashboard/${agencyInviteId}/billing?plan=${searchParams?.plan}`,
          });
        }
        if (searchParams.state) {
          const statePath = searchParams.state.split("___")[0];
          const stateAgencyId = searchParams.state.split("___")[1];

          if (!stateAgencyId) console.log("not authenticated");
          navigate({
            to: `/dashboard/${stateAgencyId}/${statePath}?code=${searchParams?.code}`,
          });
        } else navigate({ to: `/dashboard/${agencyInviteId}` });
      } else {
        console.log("not authenticated");
      }
    }
  }, [agencyInviteId, user, searchParams, navigate, subAccount?.id]);

  return (
    <section className="flex flex-col items-center w-full h-screen max-w-full mt-28">
      <h1 className="text-4xl"> Create An Agency</h1>

      <CreateAgencyForm data={{ companyEmail: authUser?.email[0] }} />
    </section>
  );
};

export default AgencyPage;
