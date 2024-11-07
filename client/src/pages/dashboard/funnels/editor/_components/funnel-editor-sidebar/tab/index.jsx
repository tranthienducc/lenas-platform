import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DatabaseIcon,
  Plus,
  SettingsIcon,
  SquareStackIcon,
} from "lucide-react";

const TabList = () => {
  return (
    <TabsList className="flex flex-col items-center w-full gap-4 bg-transparent justify-evenly h-fit">
      <TabsTrigger
        value="Settings"
        className="size-10 p-0 data-[state=active]:bg-muted"
      >
        <SettingsIcon />
      </TabsTrigger>
      <TabsTrigger
        value="Components"
        className="data-[state=active]:bg-muted size-10 p-0"
      >
        <Plus />
      </TabsTrigger>
      <TabsTrigger
        value="Layers"
        className="size-10 p-0 data-[state=active]:bg-muted"
      >
        <SquareStackIcon />
      </TabsTrigger>
      <TabsTrigger
        value="Media"
        className="size-10 p-0 data-[state=active]:bg-muted"
      >
        <DatabaseIcon />
      </TabsTrigger>
    </TabsList>
  );
};

export default TabList;
