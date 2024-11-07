import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import SelectFontWeight from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab/tabs-component/SelectFontWeight";
import TabsAlignItem from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab/tabs-component/TabsAlignItem";
import TabsBackgroundSize from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab/tabs-component/TabsBackgroundSize";
import TabsFlexBox from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab/tabs-component/TabsFlexBox";
import TabsJustifyContent from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab/tabs-component/TabsJustifyContent";
import { useEditor } from "@/providers/editor/editor-provider";

const SettingsTab = () => {
  const { dispatch, state } = useEditor();
  const handleOnChange = (e) => {
    const styleSettings = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [styleSettings]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.styles,
            ...styleObject,
          },
        },
      },
    });
  };

  const handleChangCustomValue = (e) => {
    const settingProperty = e.target.id;
    let value = e.target.value;
    const styleObject = {
      [settingProperty]: value,
    };

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        elementDetails: {
          ...state.editor.selectedElement,
          styles: {
            ...state.editor.selectedElement.content,
            ...styleObject,
          },
        },
      },
    });
  };

  return (
    <Accordion
      defaultValue={["Typography", "Dimensions", "Decorations", "Flexbox"]}
      type="multiple"
      className="w-full"
    >
      <AccordionItem value="Custom" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Custom</AccordionTrigger>
        <AccordionContent>
          {state.editor.selectedElement.type === "link" &&
            !Array.isArray(state.editor.selectedElement.content) && (
              <div className="flex flex-col gap-2">
                <p className="text-muted-foreground">Link Path</p>
                <Input
                  id="href"
                  placeholder="https://domain.example.com/pathname"
                  onChange={handleChangCustomValue}
                  value={state.editor.selectedElement.content.href}
                />
              </div>
            )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="px-6 py-0 border-y-[1px]" value="Typography">
        <AccordionTrigger className="!no-underline">
          Typography
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 ">
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Text Align</p>
            <TabsFlexBox onChange={handleOnChange} state={state} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Font Family</p>
            <Input
              id="Geist Sans"
              onChange={handleOnChange}
              value={state.editor.selectedElement.styles?.fontFamily}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground">Color</p>
            <Input
              id="color"
              onChange={handleOnChange}
              value={state.editor.selectedElement.styles?.color}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label className="text-muted-foreground">Weight</Label>
            <SelectFontWeight onChange={handleOnChange} state={state} />
          </div>
          <>
            <Label className="text-muted-foreground">Size</Label>
            <Input
              placeholder="px"
              id="fontSize"
              onChange={handleOnChange}
              value={state.editor.selectedElement.styles?.fontSize}
            />
          </>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Dimensions" className="p-0 px-6">
        <AccordionTrigger className="!no-underline">
          Dimensions
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <>
                    <Label className="text-muted-foreground">Height</Label>
                    <Input
                      id="height"
                      placeholder="px"
                      onChange={handleOnChange}
                      value={state.editor.selectedElement.styles?.height}
                    />
                  </>
                  <Label className="text-muted-foreground">Width</Label>
                  <Input
                    placeholder="px"
                    id="width"
                    onChange={handleOnChange}
                    value={state.editor.selectedElement.styles?.width}
                  />
                </div>
              </div>
              <p className="font-medium text-white text-muted-foreground">
                Margin
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input
                      placeholder="px"
                      id="marginTop"
                      onChange={handleOnChange}
                      value={state.editor.selectedElement.styles?.marginTop}
                    />
                  </>
                  <Label className="text-muted-foreground">Bottom</Label>
                  <Input
                    placeholder="px"
                    id="marginBottom"
                    onChange={handleOnChange}
                    value={state.editor.selectedElement.styles?.marginBottom}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input
                      placeholder="px"
                      id="marginLeft"
                      onChange={handleOnChange}
                      value={state.editor.selectedElement.styles?.marginLeft}
                    />
                  </>
                  <Label className="text-muted-foreground">Right</Label>
                  <Input
                    placeholder="px"
                    id="marginRight"
                    onChange={handleOnChange}
                    value={state.editor.selectedElement.styles?.marginRight}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-white text-muted-foreground">
                Padding
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input
                      placeholder="px"
                      id="paddingTop"
                      onChange={handleOnChange}
                      value={state.editor.selectedElement.styles?.paddingTop}
                    />
                  </>
                  <Label className="text-muted-foreground">Bottom</Label>
                  <Input
                    placeholder="px"
                    id="paddingBottom"
                    onChange={handleOnChange}
                    value={state.editor.selectedElement.styles?.paddingBottom}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input
                      placeholder="px"
                      id="paddingLeft"
                      onChange={handleOnChange}
                      value={state.editor.selectedElement.styles?.paddingLeft}
                    />
                  </>
                  <Label className="text-muted-foreground">Right</Label>
                  <Input
                    placeholder="px"
                    id="paddingRight"
                    onChange={handleOnChange}
                    value={state.editor.selectedElement.styles?.paddingRight}
                  />
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Decorations" className="p-0 px-6">
        <AccordionTrigger className="!no-underline">
          Decorations
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <>
            <Label className="text-muted-foreground">Opacity</Label>
            <div className="flex items-center justify-end">
              <small className="p-2">
                {typeof state.editor.selectedElement.styles?.opacity ===
                "number"
                  ? state.editor.selectedElement.styles?.opacity
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.opacity || "0"
                      ).replace("%", "")
                    ) || 0}
                %
              </small>
              <Slider
                onValueChange={(e) => {
                  handleOnChange({
                    target: {
                      id: "opacity",
                      value: `${e[0]}px`,
                    },
                  });
                }}
                defaultValue={[
                  typeof state.editor.selectedElement.styles?.opacity ===
                  "number"
                    ? state.editor.selectedElement.styles?.opacity
                    : parseFloat(
                        (
                          state.editor.selectedElement.styles?.opacity || "0"
                        ).replace("%", "")
                      ) || 0,
                ]}
                max={100}
                step={1}
              />
            </div>
          </>
          <>
            <Label className="text-muted-foreground">Border Radius</Label>
            <div className="flex items-center justify-end">
              <small className="p-2">
                {typeof state.editor.selectedElement.styles?.borderRadius ===
                "number"
                  ? state.editor.selectedElement.styles?.borderRadius
                  : parseFloat(
                      (
                        state.editor.selectedElement.styles?.borderRadius || "0"
                      ).replace("%", "")
                    ) || 0}
                %
              </small>
              <Slider
                onValueChange={(e) => {
                  handleOnChange({
                    target: {
                      id: "borderRadius",
                      value: `${e[0]}px`,
                    },
                  });
                }}
                defaultValue={[
                  typeof state.editor.selectedElement.styles?.opacity ===
                  "number"
                    ? state.editor.selectedElement.styles?.opacity
                    : parseFloat(
                        (
                          state.editor.selectedElement.styles?.opacity || "0"
                        ).replace("%", "")
                      ) || 0,
                ]}
                max={100}
                step={1}
              />
            </div>
          </>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Color</Label>
            <div className="flex border rounded-md overflow-clip">
              <div
                className="w-12"
                style={{
                  backgroundColor:
                    state.editor.selectedElement.styles?.backgroundColor,
                }}
              />
              <Input
                placeholder="#HFI245"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundColor"
                onChange={handleOnChange}
                value={state.editor.selectedElement.styles?.backgroundColor}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Background Image</Label>
            <div className="flex border rounded-md overflow-clip">
              <div
                className="w-12"
                style={{
                  backgroundImage:
                    state.editor.selectedElement.styles?.backgroundImage,
                }}
              />
              <Input
                placeholder="url()"
                className="!border-y-0 rounded-none !border-r-0 mr-2"
                id="backgroundImage"
                onChange={handleOnChange}
                value={state.editor.selectedElement.styles?.backgroundImage}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Image Position</Label>
            <TabsBackgroundSize onChange={handleOnChange} state={state} />
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Flexbox" className="p-0 px-6">
        <AccordionTrigger className="!no-underline">Flexbox</AccordionTrigger>
        <AccordionContent>
          <Label className="text-muted-foreground">Justify Content</Label>
          <TabsJustifyContent onChange={handleOnChange} state={state} />
          <Label className="text-muted-foreground">Align Items</Label>
          <TabsAlignItem onChange={handleOnChange} state={state} />
          <div className="flex items-center gap-2 py-4">
            <Label className="text-muted-foreground">Display</Label>
            <Input
              className="size-4"
              placeholder="px"
              type="checkbox"
              id="display"
              onChange={(value) => {
                handleOnChange({
                  target: {
                    id: "display",
                    value: value.target.checked ? "flex" : "block",
                  },
                });
              }}
            />
          </div>
          <>
            <Label className="text-muted-foreground">Direction</Label>
            <Input
              placeholder="px"
              id="flexDirection"
              onChange={handleOnChange}
              value={state.editor.selectedElement.styles?.flexDirection}
            />
          </>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SettingsTab;
