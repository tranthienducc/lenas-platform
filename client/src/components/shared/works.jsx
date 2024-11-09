import Heading from "@/components/common/Heading";
import { features } from "@/constants";
import { cn } from "@/lib/utils";

const Works = () => {
  return (
    <section className="mt-[18%]">
      <Heading
        subtitle="How it works"
        title="Just 3 easy steps to get everything you need"
        className="max-w-[660px] w-full"
      />

      <div className="grid max-w-sm grid-cols-1 gap-6 mx-auto mt-16 text-gray-500 md:max-w-3xl md:grid-cols-2 xl:grid-rows-2 md:grid-rows-3 xl:max-w-6xl xl:auto-rows-fr xl:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              "group relative items-start overflow-hidden bg-neutral-50 dark:bg-[#0d0d0d] p-6 rounded-2xl shadow-md",
              feature.className
            )}
          >
            <h3 className="mb-2 font-semibold text-primary">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
            {feature.content}
            <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none bg-gradient-to-t from-neutral-50 dark:from-neutral-900"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Works;
