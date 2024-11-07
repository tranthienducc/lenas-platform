import PropTypes from "prop-types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyStart,
} from "lucide-react";

const TabsAlignItem = ({ onChange, state }) => {
  return (
    <Tabs
      onValueChange={(e) =>
        onChange({
          target: {
            id: "alignItems",
            value: e,
          },
        })
      }
      value={state.editor.selectedElement.styles?.alignItems}
    >
      <TabsList className="flex flex-row items-center justify-between gap-4 bg-transparent border rounded-md h-fit">
        <TabsTrigger
          value="center"
          className="size-10 p-0 data-[state=active]:bg-muted"
        >
          <AlignVerticalJustifyCenter size={18} />
        </TabsTrigger>
        <TabsTrigger
          value="normal"
          className="size-10 p-0 data-[state=active]:bg-muted"
        >
          <AlignVerticalJustifyStart size={18} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabsAlignItem;

TabsAlignItem.propTypes = {
  state: PropTypes.any,
  onChange: PropTypes.func,
};
