import BlurPage from "@/components/common/BlurPage";
import InfoBar from "@/components/common/InfoBar";
import NotFoundPage from "@/components/NotFoundPage";
import DashboardSideBar from "@/layout/dashboard/_component/DashboardSideBar";
import {
  useGetAllProfile,
  useGetCurrentUser,
  useGetNotificationsAndUser,
} from "@/lib/tanstack-query/queries";

import { Outlet, useParams } from "@tanstack/react-router";

export const DashboardLayout = () => {
  let allNoti = [];
  const { data: users } = useGetCurrentUser();
  // const { data: agencyId } = useVerifyUserAcceptIn();
  const { id } = useParams({ strict: false });
  const { data: user } = useGetAllProfile(users?.id);
  // const navigate = useNavigate();

  const { data: notifications } = useGetNotificationsAndUser(id);
  if (notifications) allNoti = notifications;

  // if (!user) {
  //   return navigate({ to: "/" });
  // }

  // if (!id) {
  //   return navigate({ to: "/" });
  // }

  if (user?.role !== "AGENCY_OWNER" && user?.role !== "AGENCY_ADMIN") {
    return <NotFoundPage />;
  }
  console.log("id-dashboard-layout", id);

  return (
    <main className="w-full h-screen max-h-full">
      <DashboardSideBar id={id} type="agency" />
      <section className="grid h-screen">
        <BlurPage>
          <InfoBar notifications={allNoti} role={allNoti?.[0]?.User?.role} />
          <Outlet />
        </BlurPage>
      </section>
    </main>
  );
};
