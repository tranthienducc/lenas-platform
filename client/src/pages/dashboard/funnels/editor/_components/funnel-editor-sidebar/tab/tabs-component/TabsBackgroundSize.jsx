import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlignVerticalJustifyCenter,
  ChevronsLeftRightIcon,
  LucideImageDown,
} from "lucide-react";
import PropTypes from "prop-types";

const TabsBackgroundSize = ({ state, onChange }) => {
  return (
    <Tabs
      onValueChange={(e) =>
        onChange({
          target: {
            id: "backgroundSize",
            value: e,
          },
        })
      }
      value={state.editor.selectedElement.styles?.backgroundSize?.toString()}
    >
      <TabsList className="flex flex-row items-center justify-between gap-4 bg-transparent border rounded-md h-fit">
        <TabsTrigger
          value="cover"
          className="size-10 p-0 data-[state=active]:bg-muted"
        >
          <ChevronsLeftRightIcon size={18} />
        </TabsTrigger>
        <TabsTrigger
          value="contain"
          className="size-10 p-0 data-[state=active]:bg-muted"
        >
          <AlignVerticalJustifyCenter size={22} />
        </TabsTrigger>
        <TabsTrigger
          value="auto"
          className="size-10 p-0 data-[state=active]:bg-muted"
        >
          <LucideImageDown size={18} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabsBackgroundSize;

TabsBackgroundSize.propTypes = {
  state: PropTypes.any,
  onChange: PropTypes.func,
};
