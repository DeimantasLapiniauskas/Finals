import PropTypes from "prop-types";
import { useNavigate } from "react-router";

export const AuthGuard = (props) => {
  const { children } = props;
  const navigate = useNavigate();

  if (!localStorage.getItem("user")) {
    navigate("/login");
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
