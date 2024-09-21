import Heading from "@/components/common/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { contentData } from "@/constants";
import { useState } from "react";

const Features = () => {
  const [activeTab, setActiveTab] = useState("ai-app");

  const handleChangeTab = (value) => {
    setActiveTab(value);
  };

  return (
    <section className="mt-[21%] pb-80 flex items-center justify-center flex-col">
      <Heading
        subtitle="Features"
        title="All features to generate website is heare"
        className="max-w-[660px] w-full"
      />

      <div className="grid gap-[1px] grid-cols-mansory max-w-[1079px] w-full rounded-xl">
        <div className="relative flex flex-row justify-between col-span-2 py-[43px] overflow-hidden border-grid">
          <div className="max-w-[719px] w-full h-[313px] py-12 pl-12 pr-10 flex flex-col items-start gap-8 overflow-hidden">
            <p className="text-[32px] font-normal text-grayLight dark:text-grayDark w-full">
              <strong className="text-white">
                {contentData[activeTab]?.title}
              </strong>{" "}
              {contentData[activeTab]?.content}
            </p>

            <Tabs
              value={activeTab}
              className="w-[490px] rounded-full"
              onValueChange={handleChangeTab}
            >
              <TabsList className="border rounded-full bg-inherit border-white/20">
                <TabsTrigger value="ai-app">AI Apps</TabsTrigger>
                <TabsTrigger value="web-app">Web Apps</TabsTrigger>
                <TabsTrigger value="ecommerce">Ecommence</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
                <TabsTrigger value="platforms">Platforms</TabsTrigger>
              </TabsList>
              {Object.keys(contentData).map((key) => (
                <TabsContent key={key} value={key} />
              ))}
            </Tabs>
          </div>
          <div className="max-w-[359px] w-full h-[313px] p-12"></div>
        </div>

        <div className="relative flex flex-col col-span-1 gap-4 border-grid p-7">
          <div className="flex flex-col items-start max-w-60">
            <h3 className="max-w-2xl text-base font-medium text-white text-balance">
              dwqdwqd
            </h3>
            <p className="max-w-xl text-base text-balance text-gray9">
              dqdqwdwqd
            </p>
          </div>
        </div>
        <div className="relative flex flex-col col-span-1 gap-4 border-grid p-7">
          <div className="flex flex-col items-start max-w-60">
            <h3 className="max-w-2xl text-base font-medium text-white text-balance">
              dwqdwqd
            </h3>
            <p className="max-w-xl text-base text-balance text-gray9">
              dqdqwdwqd
            </p>
          </div>
        </div>

        <div className="flex flex-col col-span-2 overflow-hidden border-grid p-7">
          <div className="flex flex-col items-start max-w-sm mb-5">
            <h3 className="text-balance max-w-2xl text-[1.375rem] font-medium text-white">
              Monitoring inspirations
            </h3>
            <p className="max-w-2xl text-gray9 text-balance text-[1.375rem] font-normal">
              Preview, orders, and future may have CMS for your create web.
            </p>
          </div>

          <div
            className="relative flex items-center justify-center pointer-events-none"
            role="img"
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Features;
