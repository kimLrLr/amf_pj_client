import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";
import styled from "styled-components";

const Btn = styled(Button)`
  text-decoration: none;
`;

export const BtnCom = ({ btnClass, btnVariant, btnType, btnName, btnLink }) => {
  const navigate = useNavigate();

  const linkPage = () => {
    navigate(routes[btnLink]);
  };

  return (
    <Btn
      className={btnClass}
      variant={btnVariant}
      type={btnType}
      onClick={linkPage}
    >
      {btnName}
    </Btn>
  );
};
