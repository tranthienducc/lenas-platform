import { BentoCard, BentoGrid } from "@/components/animations/BentoGrid";
import Heading from "@/components/common/Heading";
import { features } from "@/constants";

const Works = () => {
  return (
    <section className="mt-[58%]">
      <Heading
        subtitle="How it works"
        title="Just 3 easy steps to get everything you need"
        className="max-w-[660px] w-full"
      />

      <BentoGrid className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        {features.map((feature) => (
          <BentoCard {...feature} key={feature.name} />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Works;
