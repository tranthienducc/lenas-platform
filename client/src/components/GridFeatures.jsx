import IconsPlus from "@/components/icons/IconsPlus";
import IconsStar from "@/components/icons/IconsStar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { contentData, featuresData, reliability } from "@/constants";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Blocks, Building, ChartColumn } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";

const GridFeatures = () => {
  const [activeTab, setActiveTab] = useState("ai-app");

  const handleChangeTab = (value) => {
    setActiveTab(value);
  };
  return (
    <div className="grid gap-[1px] grid-cols-mansory max-w-[1079px] w-full rounded-xl">
      <div className="relative flex flex-row justify-between col-span-2 py-[43px] border-grid">
        <div className="max-w-[719px] w-full h-[313px] pt-4 pb-12 pl-12 pr-10 flex flex-col items-start gap-8 overflow-hidden">
          <p className="text-[32px] font-normal text-grayLight dark:text-grayDark w-full">
            <strong className="text-black dark:text-white">
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
        <div className="max-w-[359px] w-full h-[313px] p-12 flex flex-col justify-between">
          <p className="text-base font-normal text-grayLight dark:text-grayDark text-balance">
            Iterate and collaborate at light speed. Security is made easy,
            managing auth with third-party solutions like Framer. Superior
            performance through highly optimized infrastructure and CDN.
          </p>

          <Link
            href="/"
            className="flex flex-row items-center justify-between max-w-[263px] w-full h-[40px] rounded-full dark:bg-[#ededed] bg-[#0a0a0a] px-4 py-0"
          >
            <span className="text-sm font-medium text-white dark:text-black">
              Generate web in seconds
            </span>
            <IconsStar />
          </Link>
        </div>
        <IconsPlus className="absolute -left-3 -top-3" />
      </div>

      {featuresData.map((data) => (
        <div
          className="relative flex flex-col col-span-1 p-12 border-grid"
          key={data.title}
        >
          <div className="flex flex-col items-start gap-4 max-w-[350px] w-full mb-[34px]">
            <div className="flex flex-row items-center gap-2">
              {data.icon}
              <h3 className="max-w-2xl text-base font-normal text-balance text-grayLight dark:text-grayDark">
                {data.title}
              </h3>
            </div>
            <p className="max-w-xl text-2xl text-balance text-grayLight dark:text-grayDark">
              {data.sub_title}
            </p>
          </div>

          <img
            src={data.path}
            alt="features-img"
            loading="lazy"
            className="max-w-[443px] w-full h-[333px] rounded-md object-cover"
          />
        </div>
      ))}

      <div className="relative flex flex-col col-span-2 p-12 border-grid">
        <div className="flex flex-col items-start gap-4 max-w-[350px] w-full mb-[34px] absolute top-12 left-12">
          <div className="flex flex-row items-center gap-2">
            <ChartColumn className="size-4" />
            <h3 className="max-w-2xl text-base font-normal text-balance text-grayLight dark:text-grayDark">
              Site Observability
            </h3>
          </div>
          <p className="max-w-xl text-2xl text-balance text-grayLight dark:text-grayDark">
            <strong className="text-black dark:text-white">
              Privacy-friendly, lightweight, Analystics
            </strong>
            , real-time insights.
          </p>
        </div>
        <img
          src="/assets/images/analyst-img.png"
          alt="analyst-img"
          loading="lazy"
          className="object-cover w-full h-full rounded-md"
        />
        <IconsPlus className="absolute -left-3 -top-3" />
      </div>
      <div className="relative flex items-center justify-center col-span-2 p-12 border-grid">
        <p className="flex flex-row items-center gap-3 text-2xl font-semibold">
          Scale your
          <span className="flex flex-row items-center gap-2 px-4 py-2 text-sm font-normal border rounded-full border-white/20 w-fit h-fit bg-inherit">
            <Building className="size-4" />
            Enterprise
          </span>
          without compromising
          <span className="flex flex-row items-center gap-2 px-4 py-2 text-sm font-normal border rounded-full border-white/20 w-fit h-fit bg-inherit">
            <Blocks className="size-4" />
            lenas
          </span>
        </p>
      </div>

      <div className="relative col-span-2 px-12 py-[140px] border-grid w-full">
        <div className="flex flex-col items-center justify-center pb-24 text-center">
          <p className="text-2xl font-medium tracking-tight text-grayLight dark:text-grayDark max-w-[720px] w-full mb-[26px]">
            <span className="text-black dark:text-white">
              Site once, use everywhere.{" "}
            </span>
            When you generate web to Lenas, we make it instantly available
            across the plan
          </p>
          <div className="flex flex-row items-center gap-3">
            <ButtonLink url="/">More about Sites</ButtonLink>

            <ButtonLink
              url="/"
              className="text-black border bg-inherit border-white/20 dark:text-white dark:bg-inherit"
            >
              Learn about Tools
            </ButtonLink>
          </div>
        </div>

        <img
          src="/assets/images/global-domain.png"
          alt="global-img"
          loading="lazy"
          className="max-w-max w-full h-[30rem] rounded-md"
        />
        <p className="bg-[#0a0a0a] text-sm font-normal text-grayLight dark:text-grayDark rounded-xl border border-white/15 px-4 py-2 w-fit ml-[25.5rem]">
          ~ lenas-site/{" "}
          <span className="text-black dark:text-white">generate</span>
        </p>
      </div>

      {reliability.map((data) => (
        <div
          className="relative flex flex-col col-span-1 p-12 border-grid"
          key={data.title}
        >
          <div className="flex flex-col items-start gap-4 max-w-[350px] w-full mb-[34px]">
            <div className="flex flex-row items-center gap-2">
              {data.icon}
              <h3 className="max-w-2xl text-base font-normal text-balance text-grayLight dark:text-grayDark">
                {data.title}
              </h3>
            </div>
            <p className="max-w-xl text-2xl text-balance text-grayLight dark:text-grayDark">
              {data.desc}
            </p>
          </div>
        </div>
      ))}
      <div className="relative flex flex-col col-span-1 p-12 border-grid">
        <img
          src="/assets/images/code-block.png"
          alt="code block"
          className="w-full h-full rounded-md"
        />
        <IconsPlus className="absolute -right-3 -bottom-3" />
      </div>
    </div>
  );
};

export default GridFeatures;

function ButtonLink({ children, url, className }) {
  return (
    <Link
      href={url}
      className={cn(
        "px-5 py-3 rounded-full bg-black dark:bg-white text-base font-medium text-white dark:text-black",
        className
      )}
    >
      {children}
    </Link>
  );
}

ButtonLink.propTypes = {
  children: PropTypes.node,
  url: PropTypes.string,
  className: PropTypes.string,
};
