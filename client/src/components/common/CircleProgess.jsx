import { ProgressCircle } from "@tremor/react";
import PropTypes from "prop-types";

const CircleProgess = ({ description, value = 0 }) => {
  return (
    <div className="flex gap-4 items-center">
      <ProgressCircle
        showAnimation={true}
        value={value}
        radius={70}
        strokeWidth={20}
      >
        {value}%
      </ProgressCircle>
      <b>Closing Rate</b>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default CircleProgess;

CircleProgess.propTypes = {
  value: PropTypes.string,
  description: PropTypes.node,
};
