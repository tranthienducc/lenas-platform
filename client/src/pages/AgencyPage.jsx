import CreateAgencyForm from "@/components/forms/CreateAgencyForm";
import {
  useGetAllAgency,
  useGetAuthUserDetail,
  useGetCurrentUser,
} from "@/lib/tanstack-query/queries";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";

const AgencyPage = () => {
  const { data: authUser } = useGetCurrentUser();
  const { data: agencies } = useGetAllAgency();
  const { data: user } = useGetAuthUserDetail();
  const searchParams = useSearch({ strict: false });
  const navigate = useNavigate();

  console.log("verify-auth", user?.agency?.SubAccount);
  const agencyId = agencies?.[0]?.id;

  useEffect(() => {
    if (agencyId) {
      if (user?.role === "SUBACCOUNT_GUEST") {
        navigate({ to: "/subaccount" });
      } else if (
        user?.role === "AGENCY_OWNER" ||
        user?.role === "AGENCY_ADMIN"
      ) {
        if (searchParams.plan) {
          navigate({
            to: `/dashboard/${agencyId}/billing?plan=${searchParams?.plan}`,
          });
        }
        if (searchParams.state) {
          const statePath = searchParams.state.split("___")[0];
          const stateAgencyId = searchParams.state.split("___")[1];

          if (!stateAgencyId) console.log("not authenticated");
          navigate({
            to: `/dashboard/${stateAgencyId}/${statePath}?code=${searchParams?.code}`,
          });
        } else navigate({ to: `/dashboard/${agencyId}` });
      } else {
        console.log("not authenticated");
      }
    }
  }, [agencyId, user, searchParams, navigate]);

  return (
    <section className="flex flex-col items-center w-full h-screen max-w-full mt-28">
      <h1 className="text-4xl"> Create An Agency</h1>

      <CreateAgencyForm data={{ companyEmail: authUser?.email[0] }} />
    </section>
  );
};

export default AgencyPage;
