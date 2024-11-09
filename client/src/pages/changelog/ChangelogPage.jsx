import { Link } from "@tanstack/react-router";
import { AtSign } from "lucide-react";

const ChangelogPage = () => {
  return (
    <div className="px-[221px] pb-[92px] pt-40 container">
      <div className="relative grid pb-20 border-b md:grid-cols-4 border-b-white/10">
        <div className="md:col-span-1" />
        <div className="flex flex-col mx-5 space-y-6 md:col-span-3 md:mx-0">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Changelog
          </h1>
          <p className="text-lg text-grayLight dark:text-grayDark">
            All the latest updates, improvements, and fixes to Luma.cloud
          </p>
        </div>
        <div className="absolute right-0 flex items-center space-x-2 bottom-2">
          <p className="text-sm font-normal text-grayLight dark:text-grayDark">
            Subscribe to updates →
          </p>
          <Link
            className="px-4 py-3 mx-auto text-sm font-medium text-white transition-all bg-black border rounded-full shadow-sm max-w-fit border-white/10 hover:ring-4 hover:ring-gray-400"
            to="https://www.thread.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AtSign size={12} />
          </Link>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ChangelogPage;
