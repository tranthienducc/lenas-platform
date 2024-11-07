import BlurPage from "@/components/common/BlurPage";
import InfoBar from "@/components/common/InfoBar";
import DashboardSideBar from "@/layout/dashboard/_component/DashboardSideBar";
import {
  useGetAllProfile,
  useGetCurrentUser,
  useGetNotificationsAndUser,
} from "@/lib/tanstack-query/queries";
import { Outlet, useParams } from "@tanstack/react-router";

const SubAccountLayout = () => {
  const { id, funnelId, funnelPageId } = useParams({ strict: false });

  let allNoti = [];
  const { data: users } = useGetCurrentUser();
  // const { data: agencyId } = useVerifyUserAcceptIn();
  const { data: user } = useGetAllProfile(users?.id);
  // const navigate = useNavigate();

  const { data: notifications } = useGetNotificationsAndUser(id);
  if (notifications) allNoti = notifications;

  if (funnelPageId) {
    return <Outlet />;
  }

  return (
    <main className="w-full h-screen max-h-full">
      <DashboardSideBar id={id} type="subaccount" />
      <section className="grid h-screen">
        <BlurPage>
          <InfoBar notifications={allNoti} role={allNoti?.User?.role} />
          <Outlet />
        </BlurPage>
      </section>
    </main>
  );
};

export default SubAccountLayout;
