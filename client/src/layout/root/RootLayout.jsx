import PropTypes from "prop-types";

export default function RootLayout({ children }) {
  return (
    <main className="container relative w-full h-screen max-w-full">
      {children}
    </main>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
