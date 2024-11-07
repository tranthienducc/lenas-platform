import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import PropTypes from "prop-types";

const fontWeights = [
  {
    value: "100",
    label: "Thin",
  },
  {
    value: "200",
    label: "Extralight",
  },
  {
    value: "300",
    label: "Light",
  },
  {
    value: "400",
    label: "Regular",
  },
  {
    value: "500",
    label: "Medium",
  },
  {
    value: "600",
    label: "Semi Bold",
  },
  {
    value: "700",
    label: "Bold",
  },
  {
    value: "800",
    label: "Extra Bold",
  },
  {
    value: "900",
    label: "Black",
  },
];

const SelectFontWeight = ({ onChange, state }) => {
  console.log("fontWeight", state.editor.selectedElement.styles?.fontWeight);

  const handleFontWeightChange = (value) => {
    onChange({
      target: {
        id: "fontWeight",
        value: value,
      },
    });
  };

  return (
    <Select
      value={state.editor.selectedElement.styles?.fontWeight}
      onValueChange={handleFontWeightChange}
    >
      <SelectTrigger className="w-[180px] dark:text-white">
        <SelectValue placeholder="Select a weight" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Font Weights</SelectLabel>
          {fontWeights?.map((weight) => (
            <SelectItem
              key={weight.value}
              value={weight.value}
              className="w-full p-1 text-white cursor-pointer hover:bg-gray-100 hover:text-black"
            >
              <div className="flex items-center justify-between w-full">
                <span className="mr-3">{weight.label}</span>
                <span className="text-sm text-grayLight">{weight.value}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectFontWeight;

SelectFontWeight.propTypes = {
  onChange: PropTypes.func,
  state: PropTypes.any,
};
