import SubAccountLayout from "@/layout/SubAccountLayout";
import { useGetAuthUserDetail } from "@/lib/tanstack-query/queries";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";

const SubAccountPage = () => {
  const { data: user } = useGetAuthUserDetail();
  const searchParams = useSearch({ strict: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const getFirstSubbaccountWithAccess = user?.Permissions?.find(
      (per) => per.access === true
    );

    if (searchParams?.state) {
      const statePath = searchParams?.state.split("___")[0];
      const stateSubaccountId = searchParams?.state.split("___")[1];
      if (!stateSubaccountId) {
        navigate("/not-found");
        return;
      }

      navigate({
        to: `/subaccount/${stateSubaccountId}/${statePath}`,
        search: { code: searchParams?.code },
      });
      return;
    }

    if (getFirstSubbaccountWithAccess) {
      navigate({
        to: `/subaccount/${getFirstSubbaccountWithAccess.subAccountId}`,
      });
    }
  }, [user, searchParams, navigate]);

  if (!user) {
    return null;
  }

  return <SubAccountLayout></SubAccountLayout>;
};

export default SubAccountPage;
