import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CheckoutPlaceholder from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab/tabs-component/CheckoutPlaceholder";
import ContactFormPlaceholder from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab/tabs-component/ContactFormPlaceholder";
import ContainerPlaceholder from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab/tabs-component/ContainerPlaceholder";
import LinkPlaceholder from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab/tabs-component/LinkPlaceholder";
import TextPlaceholder from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab/tabs-component/TextPlaceholder";
import TwoColumnsPlaceholder from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab/tabs-component/TwoColumnsPlaceholder";
import VideoPlaceholder from "@/pages/dashboard/funnels/editor/_components/funnel-editor-sidebar/tab/tabs-component/VideoPlaceholder";

const TabComponents = () => {
  const elements = [
    {
      component: <TextPlaceholder />,
      label: "Text",
      id: "text",
      group: "elements",
    },
    {
      component: <ContainerPlaceholder />,
      label: "Container",
      id: "container",
      group: "layout",
    },
    {
      component: <TwoColumnsPlaceholder />,
      label: "2 Columns",
      id: "2Col",
      group: "layout",
    },
    {
      component: <VideoPlaceholder />,
      label: "Video",
      id: "video",
      group: "elements",
    },
    {
      component: <ContactFormPlaceholder />,
      label: "Contact",
      id: "contactForm",
      group: "elements",
    },
    {
      component: <CheckoutPlaceholder />,
      label: "Checkout",
      id: "paymentForm",
      group: "elements",
    },
    {
      component: <LinkPlaceholder />,
      label: "Link",
      id: "link",
      group: "elements",
    },
  ];

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Layout", "Elements"]}
    >
      <AccordionItem value="Layout" className="px-6 py-0 border-y-[1px]">
        <AccordionTrigger className="!no-underline">Layout</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          {elements
            .filter((element) => element.group === "layout")
            .map((element) => (
              <div
                key={element.id}
                className="flex flex-col items-center justify-center"
              >
                {element.component}
                <span className="pt-3 text-muted-foreground">
                  {element.label}
                </span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Elements" className="px-6 py-0 border-y-[1px]">
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          {elements
            .filter((element) => element.group === "elements")
            .map((element) => (
              <div
                key={element.id}
                className="flex flex-col items-center justify-center"
              >
                {element.component}
                <span className="pt-3 text-muted-foreground">
                  {element.label}
                </span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TabComponents;
