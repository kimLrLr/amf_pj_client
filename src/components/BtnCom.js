import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

export const BtnCom = ({ btnClass, btnVariant, btnType, btnName, btnLink }) => {
  const navigate = useNavigate();

  const linkPage = () => {
    navigate(routes[btnLink]);
  };

  return (
    <Button
      className={btnClass}
      variant={btnVariant}
      type={btnType}
      onClick={linkPage}
    >
      {btnName}
    </Button>
  );
};
