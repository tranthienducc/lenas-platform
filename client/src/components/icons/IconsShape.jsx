import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const IconsShape = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={cn("fill-black dark:fill-white", className)}
    >
      <path
        d="M12 0C13.4908 7.48588 16.4707 10.4947 24 12C16.469 13.5053 13.4891 16.5141 12 24C10.5092 16.5141 7.52927 13.5035 0 12C7.53102 10.4947 10.5109 7.48588 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconsShape;
IconsShape.propTypes = {
  className: PropTypes.string,
};
