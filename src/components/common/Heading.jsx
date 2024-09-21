import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const Heading = ({ title, subtitle, className }) => {
  return (
    <div className="flex flex-col items-center justify-between mb-12 text-center">
      <p className="text-lg font-normal text-grayLight dark:text-grayDark">
        {subtitle}
      </p>
      <h3
        className={cn(
          "text-[56px] leading-[67.2px] font-semibold pt-5 dark:bg-gradient-text text-black",
          className
        )}
      >
        {title}
      </h3>
    </div>
  );
};

export default Heading;

Heading.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
