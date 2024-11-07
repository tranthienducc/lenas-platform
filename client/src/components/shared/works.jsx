import Heading from "@/components/common/Heading";
import { features } from "@/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const Works = () => {
  return (
    <section className="mt-[58%]">
      <Heading
        subtitle="How it works"
        title="Just 3 easy steps to get everything you need"
        className="max-w-[660px] w-full"
      />

      <div className="grid max-w-sm grid-cols-1 gap-6 mx-auto mt-16 text-gray-500 md:max-w-3xl md:grid-cols-2 xl:grid-rows-2 md:grid-rows-3 xl:max-w-6xl xl:auto-rows-fr xl:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={cn(
              "group relative items-start overflow-hidden bg-neutral-50 dark:bg-neutral-800 p-6 rounded-2xl",
              feature.className
            )}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
          >
            <h3 className="mb-2 font-semibold text-primary">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
            {feature.content}
            <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none bg-gradient-to-t from-neutral-50 dark:from-neutral-900"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Works;
