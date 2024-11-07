import { ModeToggle } from "@/components/ModeToggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { signOutUser } from "@/lib/actions/user/signout-user";
import {
  useGetAgencyByUser,
  useGetAllProfile,
  useGetCurrentUser,
} from "@/lib/tanstack-query/queries";
import { Link, useNavigate } from "@tanstack/react-router";
import { CirclePlus, LogOut } from "lucide-react";
import PropTypes from "prop-types";

const PopoverUser = ({ user }) => {
  const { refetch } = useGetCurrentUser();
  const { data: profile } = useGetAllProfile(user?.id);
  const { data: agency } = useGetAgencyByUser(profile?.agencyId);

  const agencyId = agency?.[0].id;
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const response = await signOutUser();
      refetch();
      navigate({ to: "/login" });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  console.log("id-agency-popover-user", agencyId);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <img
          src={profile?.profileImage || "/assets/images/avatar-user.png"}
          alt="avatar-user"
          className="rounded-full cursor-pointer size-8"
        />
      </PopoverTrigger>
      <PopoverContent className="p-0 text-sm font-medium rounded-xl max-w-[256px] w-full">
        <ul className="p-2">
          <div className="px-2 pt-3 pb-2">
            <p className="text-sm font-medium text-black dark:text-white">
              {user?.email}
            </p>
          </div>
          <li className="rounded-md hover:bg-grayLight dark:hover:bg-[#181818] p-2 dark:hover:text-white hover:text-black text-grayLight dark:text-grayDark">
            <Link to={`/dashboard/${agencyId}/`}>Dashboard</Link>
          </li>
          <li className="rounded-md hover:bg-grayLight dark:hover:bg-[#181818] p-2 dark:hover:text-white hover:text-black text-grayLight dark:text-grayDark">
            <Link to={`/profile/${profile?.username}`}>Account Settings</Link>
          </li>
          <li className="rounded-md hover:bg-grayLight dark:hover:bg-[#181818] p-2 dark:hover:text-white hover:text-black text-grayLight dark:text-grayDark">
            <Link
              to="/dashboard"
              className="flex flex-row items-center justify-between w-full max-w-full"
            >
              Create Team
              <CirclePlus className="size-4" />
            </Link>
          </li>
          <Separator className="my-2 bg-white/25" />
          <li className="rounded-md hover:bg-grayLight dark:hover:bg-[#181818] p-2 dark:hover:text-white hover:text-black text-grayLight dark:text-grayDark flex flex-row items-center justify-between w-full max-w-full">
            Theme
            <ModeToggle />
          </li>
          <li className="rounded-md hover:bg-grayLight dark:hover:bg-[#181818] p-2 dark:hover:text-white hover:text-black text-grayLight dark:text-grayDark">
            <button
              onClick={handleLogOut}
              className="flex flex-row items-center justify-between w-full max-w-full"
            >
              Log Out
              <LogOut className="size-4" />
            </button>
          </li>
          <Separator className="my-2 bg-white/25" />
          <li className="flex items-center justify-center p-2 text-white bg-black rounded-md hover:bg-black/50 dark:hover:bg-white/50 dark:text-black dark:bg-white">
            <Link to="/pricing">Upgrade to Pro</Link>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverUser;

PopoverUser.propTypes = {
  user: PropTypes.any,
};
