import ContactFormComponent from "@/pages/dashboard/funnels/editor/_components/funnel-editor/funnel-edit-components/contact-form-component";
import Container from "@/pages/dashboard/funnels/editor/_components/funnel-editor/funnel-edit-components/container";
import LinkComponent from "@/pages/dashboard/funnels/editor/_components/funnel-editor/funnel-edit-components/link";
import PaymentComponent from "@/pages/dashboard/funnels/editor/_components/funnel-editor/funnel-edit-components/payment-component";
import TextComponent from "@/pages/dashboard/funnels/editor/_components/funnel-editor/funnel-edit-components/text";
import TwoColumns from "@/pages/dashboard/funnels/editor/_components/funnel-editor/funnel-edit-components/two-columns";
import VideoComponent from "@/pages/dashboard/funnels/editor/_components/funnel-editor/funnel-edit-components/video";
import PropTypes from "prop-types";

const Recursive = ({ element }) => {
  switch (element.type) {
    case "text":
      return <TextComponent element={element} />;
    case "container":
      return <Container element={element} />;
    case "video":
      return <VideoComponent element={element} />;
    case "contactForm":
      return <ContactFormComponent element={element} />;
    case "paymentForm":
      return <PaymentComponent element={element} />;
    case "2Col":
      return <TwoColumns element={element} />;
    case "__body":
      return <Container element={element} />;

    case "link":
      return <LinkComponent element={element} />;
    default:
      return null;
  }
};

export default Recursive;

Recursive.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          type: PropTypes.string,
        })
      ),
      PropTypes.shape({
        innerText: PropTypes.string,
        href: PropTypes.string,
        src: PropTypes.string,
      }),
    ]),
    name: PropTypes.string,
    styles: PropTypes.object,
    type: PropTypes.string,
  }),
};
