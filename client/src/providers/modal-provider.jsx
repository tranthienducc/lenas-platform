import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

export const ModalContext = createContext({
  data: {},
  isOpen: false,
  setOpen: () => {},
  setClose: () => {},
});

const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const setOpen = async (modal, data) => {
    if (modal) {
      if (typeof data === "function") {
        const fetchedData = await data();
        setData(fetchedData);
      } else {
        setData(data);
      }
      setShowModal(modal);
      setIsOpen(true);
    }
  };

  const setClose = () => {
    setIsOpen(false);
    setData({});
  };

  if (!isMounted) return null;

  return (
    <ModalContext.Provider value={{ data, setOpen, setClose, isOpen }}>
      {children}
      {showModal}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within the modal provider");
  }
  return context;
};

export default ModalProvider;

ModalProvider.propTypes = {
  children: PropTypes.node,
};
