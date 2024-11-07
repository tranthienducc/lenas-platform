import PropTypes from "prop-types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlignHorizontalJustifyCenterIcon,
  AlignHorizontalJustifyEndIcon,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceAround,
  AlignHorizontalSpaceBetween,
} from "lucide-react";

const TabsJustifyContent = ({ onChange, state }) => {
  return (
    <Tabs
      onValueChange={(e) =>
        onChange({
          target: {
            id: "justifyContent",
            value: e,
          },
        })
      }
      value={state.editor.selectedElement.styles?.justifyContent}
    >
      <TabsList className="flex flex-row items-center justify-between gap-4 bg-transparent border rounded-md h-fit">
        <TabsTrigger
          value="space-between"
          className="size-10 p-0 data-[state=active]:bg-muted"
        >
          <AlignHorizontalSpaceBetween size={18} />
        </TabsTrigger>
        <TabsTrigger
          value="space-evenly"
          className="size-10 p-0 data-[state=active]:bg-muted"
        >
          <AlignHorizontalSpaceAround size={18} />
        </TabsTrigger>
        <TabsTrigger
          value="center"
          className="size-10 p-0 data-[state=active]:bg-muted"
        >
          <AlignHorizontalJustifyCenterIcon size={18} />
        </TabsTrigger>
        <TabsTrigger
          value="start"
          className="size-10 p-0 data-[state=active]:bg-muted"
        >
          <AlignHorizontalJustifyStart size={18} />
        </TabsTrigger>
        <TabsTrigger
          value="end"
          className="size-10 p-0 data-[state=active]:bg-muted"
        >
          <AlignHorizontalJustifyEndIcon size={18} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabsJustifyContent;

TabsJustifyContent.propTypes = {
  state: PropTypes.any,
  onChange: PropTypes.func,
};
