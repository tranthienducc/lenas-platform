import { Link } from "@tanstack/react-router";

const NotFoundPage = () => {
  return (
    <>
      <div>
        <div className="py-5 text-center lg:py-20">
          <h1 className="flex flex-col items-center gap-5 mb-5 text-3xl font-bold text-center lg:text-5xl">
            <span className="inline-block text-white text-7xl">404</span>
            <span className="text-white">Not found page</span>
          </h1>
          <p className="text-center text-lg max-w-[600px] mx-auto mb-10 text-gray9">
            It looks like the page you are looking for does not exist or has
            been removed. Please check the link again or return to the home
            page.
          </p>

          <Link to="/" className="text-white">
            Back to home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
