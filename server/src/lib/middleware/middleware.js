import supabase from "../supabase/supabase";

const getSubdomain = (host) => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const developmentDomain = process.env.SERVER_DEVELOPMENT_DOMAIN;
  const productionDomain = process.env.SERVER_PRODUCTION_DOMAIN;

  const domain = isDevelopment ? developmentDomain : productionDomain;

  if (isDevelopment && host.includes("localhost")) {
    return host.split(".")[0] === "localhost" ? null : host.split(".")[0];
  }

  if (!host || host === domain || host.startsWith("www.")) return null;

  const subdomain = host.replace(`.${domain}`, "");
  return subdomain !== host ? subdomain : null;
};

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const { data: user, error } = await supabase.auth.getUser(token);
      if (error) {
        console.log("Auth error:", error);
        return res.status(401).json({ error: "Invalid token" });
      }
      req.user = user;
    }

    const hostname = req.headers.host;
    const customSubDomain = getSubdomain(hostname);

    if (customSubDomain) {
      req.subdomain = customSubDomain;

      // Only rewrite URL if it's not already prefixed with subdomain
      if (!req.url.startsWith(`${customSubDomain}`)) {
        req.url = `${customSubDomain}${req.url}`;
      }

      if (req.path === "/") {
        return res.redirect(`${customSubDomain}`);
      }
    }

    // Protected routes check
    if (
      req.path.startsWith("/dashboard") ||
      req.path.startsWith("/subaccount")
    ) {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }
    }

    next();
  } catch (error) {
    console.error("Middleware error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const pathMatcher = async (req, res, next) => {
  const hostname = req.headers.host;
  const pathname = req.path;
  const subDomainName = getSubdomain(hostname);

  if (
    subDomainName &&
    !pathname.startsWith("/api") &&
    !pathname.match(/\.[^/]+$/)
  ) {
    req.subDomainName = subDomainName;
  }
  next();
};

export { authMiddleware, pathMatcher, corsOptions };
