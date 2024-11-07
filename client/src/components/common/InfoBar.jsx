import PopoverUser from "@/components/common/PopoverUser";
import { ModeToggle } from "@/components/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useGetCurrentUser } from "@/lib/tanstack-query/queries";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

const InfoBar = ({ notifications, role, className, subAccountId }) => {
  const [allNotifications, setAllNotifications] = useState(notifications);
  const [showAll, setShowAll] = useState(true);
  const { data: user } = useGetCurrentUser();

  const handleClick = () => {
    if (!showAll) {
      setAllNotifications(notifications);
    } else {
      if (notifications?.length === 0) {
        setAllNotifications(
          notifications?.filter((item) => item.subAccountId === subAccountId) ??
            []
        );
      }
    }

    setShowAll((prev) => !prev);
  };

  return (
    <>
      <div
        className={cn(
          "fixed z-20 left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex gap-4 items-center border-b",
          className
        )}
      >
        <div className="flex items-center gap-4 ml-auto">
          <PopoverUser user={user} />
          <ModeToggle />
          <Sheet>
            <SheetTrigger>
              <div className="flex items-center justify-center text-white rounded-full size-9 bg-primary">
                <Bell size={17} className="text-black" />
              </div>
            </SheetTrigger>
            <SheetContent className="pr-2 mt-4 mr-4 overflow-scroll">
              <SheetHeader className="text-left">
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>
                  {(role === "AGENCY_ADMIN" || role === "AGENCY_OWNER") && (
                    <Card className="flex items-center justify-between p-4 mb-4">
                      Current Account
                      <Switch onCheckedChange={handleClick} />
                    </Card>
                  )}
                </SheetDescription>
              </SheetHeader>
              {allNotifications.length > 0 ? (
                allNotifications.map((notification) => (
                  <div
                    key={notification?.id}
                    className="flex flex-col overflow-x-scroll gap-y-2 text-ellipsis"
                  >
                    <div className="flex gap-2">
                      <Avatar>
                        <AvatarImage
                          src={
                            notification?.User?.avatarUrl ||
                            "/assets/images/avatar-user.png"
                          }
                          alt="profile-picture"
                        />
                        <AvatarFallback className="bg-primary">
                          {notification?.User?.name?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold">
                          {notification?.notification?.split("|")[0]}
                        </span>
                        <span className="text-muted-foreground">
                          {notification?.notification?.split("|")[1]}
                        </span>
                        <span className="font-bold">
                          {notification?.notification?.split("|")[2]}
                        </span>

                        <small className="text-xs text-muted-foreground">
                          {new Date(
                            notification?.createdAt
                          ).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center mb-4 text-muted-foreground">
                  You have no notifications
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default InfoBar;
InfoBar.propTypes = {
  notifications: PropTypes.array.isRequired,
  role: PropTypes.any,
  className: PropTypes.string,
  subAccountId: PropTypes.string,
};
