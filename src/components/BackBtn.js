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

export const BackBtn = ({ onClick }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onClick) {
      // 상태 초기화 함수 실행시키기
      onClick();
    } else {
      // 기본적으로는 뒤로가기
      navigate(-1);
    }
  };

  return <ArBtn onClick={handleBackClick}>{"<"}</ArBtn>;
};
