import { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BackBtn } from "../../../components/BackBtn";
import styled from "styled-components";
import FormInput from "./FormInput";
import EmailVerification from "./EmailVerification";

const TitleText = styled.h2`
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 15px;
`;

export const FormCon = () => {
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [authCode, setAuthCode] = useState(true);
  const [timer, setTimer] = useState(0);

  const [name, setName] = useState("");
  const [isNameTouched, setIsNameTouched] = useState(false);
  const [nameValid, setNameValid] = useState(true);

  const [affiliation, setAffiliation] = useState("");
  const [affiliationValid, setAffiliationValid] = useState(true);

  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formValid, setFormValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const nameRegex = /^[가-힣]{2,}$|^[a-zA-Z\s]{2,}$/;
    setNameValid(nameRegex.test(name));
  }, [name]);

  useEffect(() => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    setPasswordValid(passwordRegex.test(password));
  }, [password]);

  useEffect(() => {
    const allFieldsFilled =
      emailVerified &&
      nameValid &&
      affiliationValid &&
      passwordValid &&
      password === confirmPassword;
    setFormValid(allFieldsFilled);
  }, [
    emailVerified,
    nameValid,
    affiliationValid,
    passwordValid,
    password,
    confirmPassword,
  ]);

  // 인증 버튼 클릭 시 이메일로 인증번호 전송
  const sendEmailHandler = async () => {
    try {
      const response = await fetch("http://localhost:8080/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setTimer(300); // 5분 타이머 시작
        setEmailVerified(false); // 이메일 인증 초기화
        console.log("인증번호가 전송되었습니다.");
      } else {
        console.error("인증번호 전송 실패");
      }
    } catch (error) {
      console.error("서버 오류:", error);
    }
  };

  // 이메일 인증 코드 검증
  const verifyEmailHandler = async () => {
    try {
      const response = await fetch("http://localhost:8080/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: inputCode }),
      });
      if (response.ok) {
        setEmailVerified(true);
        console.log("이메일 인증 성공");
      } else {
        setAuthCode(false);
        console.error("인증 실패");
      }
    } catch (error) {
      console.error("서버 오류:", error);
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, affiliation, password }),
      });
      if (response.ok) {
        navigate("/login");
      } else {
        const result = await response.json();
        console.error("회원가입 실패:", result);
      }
    } catch (error) {
      console.error("서버 오류:", error);
    }
  };

  const formatTime = (time) => {
    const min = String(Math.floor(time / 60)).padStart(2, "0");
    const sec = String(time % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <Container className="account_div">
      <Row className="account_row">
        <Col md={6}>
          <BackBtn />
          <TitleText>회원가입</TitleText>
          <form onSubmit={registerHandler}>
            <EmailVerification
              email={email}
              setEmail={setEmail}
              emailVerified={emailVerified}
              setEmailVerified={setEmailVerified}
              sendEmailHandler={sendEmailHandler}
              verifyEmailHandler={verifyEmailHandler}
              timer={timer}
              formatTime={formatTime}
              inputCode={inputCode}
              setInputCode={setInputCode}
              authCode={authCode}
            />

            <FormInput
              label="이름"
              type="text"
              placeholder="이름을 입력하세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setIsNameTouched(true)}
              error={
                !nameValid && isNameTouched
                  ? "* 이름을 정확하게 입력해주세요."
                  : ""
              }
            />

            <FormInput
              label="소속"
              type="text"
              placeholder="소속을 입력하세요."
              value={affiliation}
              onChange={(e) => setAffiliation(e.target.value)}
              error={!affiliationValid ? "* 소속을 정확하게 입력해주세요." : ""}
            />

            <FormInput
              label="비밀번호"
              type="password"
              placeholder="특수문자, 영문자, 숫자를 포함하여 8자 이상"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!passwordValid ? "* 비밀번호가 올바르지 않습니다." : ""}
            />

            <FormInput
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호 재입력"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={
                password !== confirmPassword && confirmPassword.length > 0
                  ? "* 비밀번호가 일치하지 않습니다."
                  : ""
              }
            />

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={!formValid}
            >
              회원가입
            </Button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};
