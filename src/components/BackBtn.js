import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ArBtn = styled.button`
  position: relative;
  top: 0;
  left: 0;
  background-color: #fff;
  border: none;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 13px;
  color: #0d6efd;
`;

export const BackBtn = () => {
  const navigate = useNavigate();
  return <ArBtn onClick={() => navigate(-1)}>{"<"}</ArBtn>;
};
