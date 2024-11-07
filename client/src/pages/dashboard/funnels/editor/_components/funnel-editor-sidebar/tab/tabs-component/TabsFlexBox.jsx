import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import PropTypes from "prop-types";

const TabsFlexBox = ({ onChange, state }) => {
  return (
    <Tabs
      onValueChange={(e) =>
        onChange({
          target: {
            id: "textAlign",
            value: e,
          },
        })
      }
      value={state.editor.selectedElement.styles?.textAlign}
    >
      <TabsList className="flex flex-row items-center justify-between gap-4 bg-transparent border rounded-md h-fit">
        <TabsTrigger
          value="left"
          className="size-10 p-0 data-[state=active]:bg-muted"
        >
          <AlignLeft size={18} />
        </TabsTrigger>
        <TabsTrigger
          value="right"
          className="size-10 p-0 data-[state=active]:bg-muted"
        >
          <AlignRight size={18} />
        </TabsTrigger>
        <TabsTrigger
          value="center"
          className="size-10 p-0 data-[state=active]:bg-muted"
        >
          <AlignCenter size={18} />
        </TabsTrigger>
        <TabsTrigger
          value="justify"
          className="size-10 p-0 data-[state=active]:bg-muted"
        >
          <AlignJustify size={18} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default TabsFlexBox;

TabsFlexBox.propTypes = {
  onChange: PropTypes.func,
  state: PropTypes.any,
};
