import { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import FormInput from "./FormInput";
import { ErrorText } from "../../../components/ErrorText";

const EmailVerification = ({
  email,
  setEmail,
  emailVerified,
  setEmailVerified,
  sendEmailHandler,
  verifyEmailHandler,
  timer,
  formatTime,
  inputCode,
  setInputCode,
  authCode,
}) => {
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

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
        <div className="d-flex">
          <Button
            variant="outline-primary"
            onClick={sendEmailHandler}
            disabled={emailVerified || !emailValid}
          >
            {emailVerified ? "확인됨" : "인증"}
          </Button>
        </div>
        {timer > 0 && !emailVerified && <small>{formatTime(timer)}</small>}
      </FormInput>

      <FormInput
        label="이메일 인증 번호"
        type="text"
        placeholder="인증번호 입력"
        value={inputCode}
        onChange={removeInputBlankHandler}
        disabled={emailVerified || timer <= 0}
      >
        <div className="d-flex">
          <Button
            variant={emailVerified ? "success" : "outline-primary"}
            onClick={verifyEmailHandler}
            disabled={emailVerified || timer <= 0}
          >
            {emailVerified ? "인증됨" : "확인"}
          </Button>
        </div>
        {emailVerified ? (
          <Alert variant="success">이메일이 인증되었습니다.</Alert>
        ) : (
          !authCode && <ErrorText errtxt="* 유효하지 않은 인증번호입니다." />
        )}
      </FormInput>
    </>
  );
};

export default EmailVerification;
