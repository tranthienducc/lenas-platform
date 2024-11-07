import { useGetCurrentUser } from "@/lib/tanstack-query/queries";
import PropTypes from "prop-types";
import { createContext, useContext } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { data: user } = useGetCurrentUser();

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};

export const useUser = () => {
  return useContext(UserContext);
};
