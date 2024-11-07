import PropTypes from "prop-types";

const BlurPage = ({ children }) => {
  return (
    <div
      className="h-screen overflow-scroll backdrop-blur-[35px] dark:bg-[#000] bg-muted/60 dark:shadow-2xl dark:shadow-black mx-auto pb-5 pt-[5.75rem] pr-3 absolute top-0 right-0 left-0 bottom-0 z-[11] pl-[17.75rem]"
      id="blur-page"
    >
      {children}
    </div>
  );
};

export default BlurPage;
BlurPage.propTypes = {
  children: PropTypes.node,
};
