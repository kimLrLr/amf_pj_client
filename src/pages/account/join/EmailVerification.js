import { useEffect, useState } from "react";
import { Button, Alert } from "react-bootstrap";
import FormInput from "./FormInput"; // 위에서 만든 FormInput 컴포넌트 사용

const EmailVerification = ({
  email,
  setEmail,
  emailVerified,
  setEmailVerified,
  timer,
  formatTime,
  sendEmailHandler,
  verifyEmailHandler,
  inputCode,
  setInputCode,
  authCode,
}) => {
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  // 이메일 유효성 검사
  useEffect(() => {
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    setEmailValid(emailRegex.test(email));
  }, [email]);

  const removeInputBlankHandler = (e) => {
    const removeBlankCode = e.target.value.replace(/\s/g, "");
    setInputCode(removeBlankCode);
  };

  return (
    <>
      {/* 이메일 입력 및 인증 버튼 */}
      <FormInput
        label="이메일"
        type="email"
        placeholder="이메일 형식으로 입력해주세요."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setIsEmailTouched(true)}
        error={
          !emailValid && isEmailTouched
            ? "* 올바른 이메일 주소를 입력해주세요."
            : ""
        }
        disabled={emailVerified}
      >
        <Button
          variant="outline-primary"
          onClick={sendEmailHandler}
          disabled={emailVerified || !emailValid}
        >
          {emailVerified ? "확인됨" : "인증"}
        </Button>
      </FormInput>

      {/* 인증 번호 입력 및 확인 버튼 */}
      <FormInput
        label="이메일 인증 번호"
        type="text"
        placeholder="인증번호 입력"
        value={inputCode}
        onChange={removeInputBlankHandler}
        disabled={emailVerified || timer <= 0}
      >
        <Button
          variant={emailVerified ? "success" : "outline-primary"}
          onClick={verifyEmailHandler}
          disabled={emailVerified || timer <= 0}
        >
          {emailVerified ? "인증됨" : "확인"}
        </Button>
      </FormInput>

      {/* 인증 성공 또는 실패 메시지 */}
      {emailVerified ? (
        <Alert variant="success">이메일이 인증되었습니다.</Alert>
      ) : (
        !authCode && (
          <Alert variant="danger">* 유효하지 않은 인증번호입니다.</Alert>
        )
      )}

      {/* 타이머 표시 */}
      {timer > 0 && !emailVerified && <small>{formatTime(timer)}</small>}
    </>
  );
};

export default EmailVerification;
