import { useState, useEffect } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { ErrorText } from "../../../components/ErrorText";
import { useNavigate, useParams } from "react-router-dom";
import {
  AccountRow,
  FormControl,
  FormGroup,
  FormLabel,
  MainContainer,
  TitleText,
} from "../../../style/common";
import { resetPassword } from "../../../api";

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
  const [passwordValid, setPasswordValid] = useState(false); // 비밀번호 유효성
  const [passwordLengthValid, setPasswordLengthValid] = useState(false); // 비밀번호 길이 유효성
  const [isPasswordTouched, setIsPasswordTouched] = useState(false); // 비밀번호 입력 여부 확인
  const [formValid, setFormValid] = useState(false); // 전체 폼 유효성

  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 userId 추출

  // 비밀번호 유효성 검사
  useEffect(() => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    setPasswordValid(passwordRegex.test(newPassword));
    setPasswordLengthValid(newPassword.length >= 8);
  }, [newPassword]);

  // 전체 폼 유효성 검사
  useEffect(() => {
    const isFormValid =
      passwordValid && passwordLengthValid && newPassword === confirmPassword;

    setFormValid(isFormValid);
  }, [passwordValid, passwordLengthValid, newPassword, confirmPassword]);

  // 비밀번호 재설정 핸들러
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!formValid) return;

    try {
      await resetPassword(id, newPassword); // API 요청
      alert("비밀번호가 성공적으로 재설정되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("비밀번호 재설정 실패:", error);
    }
  };

  return (
    <MainContainer>
      <AccountRow>
        <Col md={6}>
          <TitleText>비밀번호 재설정</TitleText>
          <Form onSubmit={handlePasswordReset}>
            {/* 새 비밀번호 입력 */}
            <FormGroup controlId="formBasicNewPassword" className="mb-3">
              <FormLabel>새 비밀번호</FormLabel>
              <FormControl
                type="password"
                placeholder="특수문자, 영문자, 숫자를 포함하여 8자 이상"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={() => setIsPasswordTouched(true)}
              />
              {!passwordValid && isPasswordTouched && (
                <ErrorText errtxt="* 특수문자, 영문자, 숫자를 포함해주세요." />
              )}
              {!passwordLengthValid && isPasswordTouched && (
                <ErrorText errtxt="* 비밀번호는 8자 이상이어야 합니다." />
              )}
            </FormGroup>

            {/* 비밀번호 확인 */}
            <FormGroup controlId="formBasicConfirmPassword" className="mb-3">
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl
                type="password"
                placeholder="비밀번호 재입력"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {newPassword !== confirmPassword &&
                confirmPassword.length > 0 && (
                  <ErrorText errtxt="* 비밀번호가 일치하지 않습니다." />
                )}
            </FormGroup>

            {/* 비밀번호 재설정 버튼 */}
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={!formValid}
            >
              비밀번호 재설정
            </Button>
          </Form>
        </Col>
      </AccountRow>
    </MainContainer>
  );
};
