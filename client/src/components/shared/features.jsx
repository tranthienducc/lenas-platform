import Heading from "@/components/common/Heading";
import GridFeatures from "@/components/GridFeatures";

const Features = () => {
  return (
    <section className="mt-[21%] flex items-center justify-center flex-col">
      <Heading
        subtitle="Features"
        title="All features to generate website is heare"
        className="max-w-[660px] w-full"
      />

      <GridFeatures />
    </section>
  );
};

export default Features;
