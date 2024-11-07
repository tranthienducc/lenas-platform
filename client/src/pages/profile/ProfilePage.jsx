import { useUser } from "@/context/UserProvider";
import { Link } from "@tanstack/react-router";
import { Ellipsis } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useGetAllProfile } from "@/lib/tanstack-query/queries";

const ProfilePage = () => {
  const { user } = useUser();
  const { data } = useGetAllProfile(user?.id);

  return (
    <div className="px-24 my-20">
      <div className="flex flex-row items-center gap-[60px] mb-[70px]">
        <div className="max-w-[600px] w-full">
          <img
            src={data?.profileImage || "/assets/images/avatar-user.png"}
            alt="user-profile"
            className="size-[84px] rounded-full object-cover mb-6"
          />

          <h1 className="text-[32xp] font-bold leading-[38px]">
            {data?.firstName || "Jone"} {data?.lastName || "Doe"}
          </h1>
          <h2 className="max-w-[600px] w-full text-5xl font-bold leading-[56px] mb-4">
            {data?.bio}
          </h2>
          <div className="flex flex-row items-center gap-3 mb-6 text-grayLight dark:text-grayDark">
            <p className="text-base font-normal">53,394 followers</p>
            <p className="text-base font-normal">1,394 follow</p>
            <p className="text-base font-normal">2,394 likes</p>
          </div>

          <div className="flex flex-row items-center gap-3 mb-6">
            <button className="px-6 py-2 text-base font-medium bg-black rounded-full dark:bg-white text-wrap dark:text-black">
              Get in touch
            </button>
            <button className="px-6 py-2 text-base font-medium border rounded-full border-black/20 dark:border-white/15 bg-inherit dark:bg-inherit">
              Follow
            </button>
            <Link
              to="/edit-profile/$id"
              params={{
                id: data?.username,
              }}
            >
              <Ellipsis className="size-4" />
            </Link>
          </div>

          <p className="text-sm font-medium text-grayLight dark:text-grayDark mt-[14px]">
            On team{" "}
            <strong className="text-black dark:text-white">Legon</strong>
          </p>
        </div>

        <div className="max-w-[716px] w-full">
          <img
            src="/assets/images/bg-img.jpg"
            alt=""
            className="object-cover w-full h-full min-h-[434px] rounded-2xl"
          />
        </div>
      </div>

      <Tabs defaultValue="site" className="w-full max-w-full dark:bg-inherit">
        <TabsList className="rounded-full dark:bg-white dark:text-black">
          <TabsTrigger value="site">Site</TabsTrigger>
          <TabsTrigger value="collection">Collection</TabsTrigger>
          <TabsTrigger value="like-product">Like Product</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        <Separator className="my-4 bg-black/20 dark:bg-white/20" />
        <TabsContent value="site">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="collection">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="like-product">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="about">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
