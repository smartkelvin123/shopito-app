import { useSelector } from "react-redux";

const ShowOnLogin = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return children;
  }
  return null;
};

// ShowOnLogOut component
const ShowOnLogOut = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    return children;
  }
  return null;
};

export { ShowOnLogin, ShowOnLogOut };
