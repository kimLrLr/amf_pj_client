import { useLocation, useNavigate } from "react-router-dom";
import {
  MainContainer,
  TitleText,
  SubmitBtn,
  ButtonGroup,
} from "../../../style/common";

export const CheckId = () => {
  const location = useLocation();
  const { name, email } = location.state || {};
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleResetPasswordClick = () => {
    navigate("/find-account", { state: { resetPassword: true } });
  };

  return (
    <MainContainer>
      {name && email ? (
        <TitleText>{`${name}님의 이메일(ID)는 ${email}입니다.`}</TitleText>
      ) : (
        <p>사용자 정보를 찾을 수 없습니다.</p>
      )}
      <div className="button-group">
        <ButtonGroup>
          <SubmitBtn
            className="mb-2"
            onClick={handleLoginClick} // 로그인 페이지로 이동
          >
            로그인하기
          </SubmitBtn>
          <SubmitBtn
            className="mb-2"
            onClick={handleResetPasswordClick} // 비밀번호 재설정 페이지로 이동
          >
            비밀번호 찾기
          </SubmitBtn>
        </ButtonGroup>
      </div>
    </MainContainer>
  );
};
