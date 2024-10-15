import { useState } from "react";
import { Form, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BtnCom } from "../../../components/BtnCom";
import {
  AccountRow,
  FormControl,
  FormGroup,
  FormLabel,
  MainContainer,
  TitleText,
} from "../../../style/common";
import { loginUser } from "../../../api";
import { ErrorText } from "../../../components/ErrorText";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(email, password);
      console.log("로그인 성공", result);
      navigate("/"); // 로그인 성공 시 메인 페이지로 이동
    } catch (error) {
      console.error("로그인 실패:", error.message);
      setErrorMessage(error.message); // 에러 메시지 설정

      // 비밀번호가 틀린 경우 메시지 업데이트
      if (error.message === "비밀번호 불일치") {
        setErrorMessage("사용자 정보를 다시 확인해주세요.");
      } else {
        setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <MainContainer>
      <AccountRow>
        <Col md={6}>
          <TitleText>로그인</TitleText>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}{" "}
          {/* 에러 메시지 출력 */}
          <Form onSubmit={handleSubmit}>
            <FormGroup controlId="formBasicEmail">
              <FormLabel>이메일(ID)</FormLabel>
              <FormControl
                type="email"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup controlId="formBasicPassword">
              <FormLabel>비밀번호</FormLabel>
              <FormControl
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            {errorMessage && (
              <ErrorText className="text-danger mb-3">{errorMessage}</ErrorText>
            )}

            <BtnCom
              btnName="로그인"
              btnVariant="primary"
              btnType="submit"
              btnClass="w-100 mb-3"
            />

            <BtnCom
              btnName="회원가입"
              btnVariant="link"
              btnClass="w-100"
              btnLink="join"
            />
          </Form>
          <BtnCom
            btnName="계정 찾기"
            btnVariant="link"
            btnClass="w-100"
            btnLink="findAccount"
          />
        </Col>
      </AccountRow>
    </MainContainer>
  );
};
