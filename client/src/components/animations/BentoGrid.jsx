import { ArrowRightIcon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const BentoGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl border-dark transform-gpu bg-black shadow-xl dark:shadow-dark mask-overlay",
      className
    )}
  >
    <div>{background}</div>
    <div className="z-20 flex flex-col gap-1 p-6 transition-all duration-300 pointer-events-none transform-gpu group-hover:-translate-y-10">
      <Icon className="w-12 h-12 transition-all duration-300 ease-in-out origin-left transform-gpu text-neutral-500 group-hover:scale-75" />
      <h3 className="text-xl font-semibold text-neutral-300">{name}</h3>
      <p className="max-w-lg text-neutral-400">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      )}
    >
      <Button
        variant="ghost"
        asChild
        size="sm"
        className="text-white pointer-events-auto"
      >
        <a href={href}>
          {cta}
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </a>
      </Button>
    </div>
    <div className="absolute inset-0 transition-all duration-300 pointer-events-none transform-gpu group-hover:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };

BentoGrid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
BentoCard.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  background: PropTypes.node,
  Icon: PropTypes.any,
  description: PropTypes.string,
  href: PropTypes.string,
  cta: PropTypes.string,
};
