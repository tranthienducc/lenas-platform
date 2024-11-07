import IconsPlus from "@/components/icons/IconsPlus";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="mt-[21%] grid gap-[1px] grid-cols-mansory max-w-full  w-full rounded-xl items-center justify-center px-32">
      <div className="relative flex flex-row items-center col-span-2 gap-24 p-12 border-grid">
        <Link
          href="/"
          className="rounded-full min-w-[622px] w-full h-[96px] bg-inherit dark:bg-inherit border border-white/20 text-black dark:text-white flex flex-row items-center justify-between px-4"
        >
          <span className="text-5xl font-semibold">Start Generate</span>
          <div className="rounded-full size-[60px] bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
            <ArrowRight className="size-9" />
          </div>
        </Link>

        <div className="flex flex-col gap-4 min-w-[359px] w-full">
          <Link
            href="/admin-chat"
            className="flex items-center justify-between text-white bg-black rounded-full dark:bg-white dark:text-black max-w-[263px] w-full px-3 py-[6px]"
          >
            <span className="text-sm font-medium">Talk to Admin team</span>
            <div className="flex items-center justify-center text-black bg-white rounded-full size-6 dark:bg-black dark:text-white">
              <ArrowRight className="size-4" />
            </div>
          </Link>
          <Link
            href="/pricing"
            className="flex items-center justify-between border border-white/15 text-black dark:text-white rounded-full dark:bg-inherit bg-inherit max-w-[263px] w-full px-3 py-[6px]"
          >
            <span className="text-sm font-medium">Get an Enterprise Trial</span>
            <div className="flex items-center justify-center text-white bg-black rounded-full size-6 dark:bg-white dark:text-black">
              <ArrowRight className="size-4" />
            </div>
          </Link>
        </div>

        <IconsPlus className="absolute -left-3 -top-3" />
      </div>
    </section>
  );
};

export default CallToAction;
