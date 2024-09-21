import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const IconsPlus = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      className={cn("stroke-black dark:stroke-white", className)}
    >
      <path d="M16 0L16 32" strokeWidth="1" strokeLinejoin="round" />
      <path d="M32 16L0 16" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
};

export default IconsPlus;

IconsPlus.propTypes = {
  className: PropTypes.string,
};
