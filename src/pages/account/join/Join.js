import { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BackBtn } from "../../../components/BackBtn";
import { registerUser } from "../../../api";
import {
  AccountRow,
  MainContainer,
  SubmitBtn,
  TitleText,
} from "../../../style/common";
import { EmailInput } from "../../../components/forms/EmailInput";
import { NameInput } from "../../../components/forms/NameInput";
import { TelInput } from "../../../components/forms/TelInput";
import { AffiliationInput } from "../../../components/forms/AffiliationInput";
import { PasswordInput } from "../../../components/forms/PasswordInput";

export const Join = () => {
  // State 설정

  // 이메일
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true); // 이메일 형식 유효성
  const [inputCode, setInputCode] = useState(""); // 인증번호 입력
  const [emailVerified, setEmailVerified] = useState(false); // 이메일 인증 여부
  const [authCode, setAuthCode] = useState(true);

  const [timer, setTimer] = useState(0); // 타이머

  // 이름
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(true); // 이름 확인

  // 전화번호
  const [phone, setPhone] = useState(""); // 전화번호
  const [phoneValid, setPhoneValid] = useState(true); // 전화번호 유효성
  const [isPhoneVerified, setIsPhoneVerified] = useState(false); // 전화번호 인증 여부
  const [countryCode, setCountryCode] = useState("+82"); // 국가 코드 추가

  // 소속
  const [affiliation, setAffiliation] = useState("");
  const [affiliationValid, setAffiliationValid] = useState(true); // 소속값 확인

  // 비밀번호
  const [password, setPassword] = useState(""); // 비밀번호
  const [passwordValid, setPasswordValid] = useState(true); // 비밀번호 형식 유효성
  const [passwordLengthValid, setPasswordLengthValid] = useState(true); // 비밀번호 길이 유효성
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인

  const [formValid, setFormValid] = useState(false); // 필드값 검증을 위함(전체 폼 유효성)

  const navigate = useNavigate();

  // 필드 값 검증 및 회원가입 버튼 활성화 조건
  useEffect(() => {
    const allFieldsFilled =
      emailValid &&
      nameValid &&
      phoneValid &&
      isPhoneVerified &&
      affiliationValid &&
      passwordValid &&
      emailVerified &&
      password === confirmPassword;

    setFormValid(allFieldsFilled);
  }, [
    emailValid,
    nameValid,
    phoneValid,
    isPhoneVerified,
    affiliationValid,
    passwordValid,
    emailVerified,
    password,
    confirmPassword,
  ]);

  // 회원가입 처리
  const registerHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      name,
      countryCode,
      phone,
      affiliation,
      password,
    };

    try {
      const result = await registerUser(userData);
      console.log("회원가입 성공", result);
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error.message);
    }
  };
  return (
    <MainContainer>
      <AccountRow>
        <Col md={6}>
          {/* 뒤로가기 버튼 */}
          <BackBtn />
          <TitleText>회원가입</TitleText>
          <Form onSubmit={registerHandler}>
            {/* 이메일 */}
            <EmailInput
              email={email}
              setEmail={setEmail}
              emailValid={emailValid}
              setEmailValid={setEmailValid}
              emailVerified={emailVerified}
              setEmailVerified={setEmailVerified}
              authCode={authCode}
              setAuthCode={setAuthCode}
              inputCode={inputCode}
              setInputCode={setInputCode}
              timer={timer}
              setTimer={setTimer}
            />

            {/* 이름 */}
            <NameInput
              name={name}
              setName={setName}
              nameValid={nameValid}
              setNameValid={setNameValid}
            />

            {/* 전화번호 */}
            <TelInput
              phone={phone}
              setPhone={setPhone}
              phoneValid={phoneValid}
              setPhoneValid={setPhoneValid}
              isPhoneVerified={isPhoneVerified}
              setIsPhoneVerified={setIsPhoneVerified}
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              showVerifyButton={true} // 버튼을 표시
            />

            {/* 소속 입력 */}
            <AffiliationInput
              affiliation={affiliation}
              setAffiliation={setAffiliation}
              affiliationValid={affiliationValid}
              setAffiliationValid={setAffiliationValid}
            />

            {/* 비밀번호 입력 */}
            <PasswordInput
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              passwordValid={passwordValid}
              setPasswordValid={setPasswordValid}
              passwordLengthValid={passwordLengthValid}
              setPasswordLengthValid={setPasswordLengthValid}
            />

            {/* 회원가입 버튼 */}
            <SubmitBtn type="submit" disabled={!formValid}>
              회원가입
            </SubmitBtn>
          </Form>
        </Col>
      </AccountRow>
    </MainContainer>
  );
};
