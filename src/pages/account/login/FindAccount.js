import { useEffect, useState } from "react";
import { Form, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { BackBtn } from "../../../components/BackBtn";
import {
  AccountRow,
  MainContainer,
  SubmitBtn,
  TitleText,
} from "../../../style/common";
import { ErrorText } from "../../../components/ErrorText";
import { TelInput } from "../../../components/forms/TelInput";
import { EmailInput } from "../../../components/forms/EmailInput";
import { findIdByPhone, sendResetLink } from "../../../api";

export const FindAccount = () => {
  const [isFindingID, setIsFindingID] = useState(false);
  const [isResettingPW, setIsResettingPW] = useState(false);

  // 전화번호
  const [phone, setPhone] = useState(""); // 전화번호 입력
  const [phoneValid, setPhoneValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [countryCode, setCountryCode] = useState("+82"); // 기본 한국 국가 코드

  // 이메일
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true); // 이메일 형식 유효성
  const [emailVerified, setEmailVerified] = useState(false); // 이메일 인증 여부
  const [canSendLink, setCanSendLink] = useState(false); // 링크 전송 버튼 활성화

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.resetPassword) {
      setIsResettingPW(true); // 비밀번호 재설정 화면 표시
      setIsFindingID(false); // ID 찾기 화면 숨김
    }
  }, [location.state]);

  const findingSameIdHandler = async (e) => {
    e.preventDefault();
    if (!phoneValid) {
      setErrorMessage("* 유효한 전화번호를 입력해주세요.");
      return;
    }

    try {
      const { name, email } = await findIdByPhone(phone, countryCode);
      navigate("/check-id", { state: { name, email } });
    } catch (error) {
      setErrorMessage(
        error.message || "해당 전화번호로 가입된 정보가 없습니다."
      );
    }
  };

  // 이메일 유효성 검사
  useEffect(() => {
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    const isValid = emailRegex.test(email);
    setEmailValid(isValid);
    setCanSendLink(isValid); // 이메일이 유효한 경우 링크 전송 버튼 활성화
  }, [email, emailValid]);

  const handleFindID = () => {
    setIsFindingID(true);
    setIsResettingPW(false);
  };

  const handleResetPW = () => {
    setIsFindingID(false);
    setIsResettingPW(true);
  };

  // 비밀번호 재설정 링크 전송
  const sendResetLinkHandler = async (e) => {
    e.preventDefault();
    if (!emailValid) return;

    try {
      await sendResetLink(email);
      alert("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message || "서버 오류가 발생했습니다.");
    }
  };

  // 뒤로가기 버튼 클릭 시 동작
  const handleBackClick = () => {
    if (isFindingID || isResettingPW) {
      // ID 찾기나 PW 재설정 화면일 때는 초기화
      setIsFindingID(false);
      setIsResettingPW(false);
      setPhone("");
      setEmail("");
      setErrorMessage("");
    } else {
      // 계정 찾기 기본 화면일 때는 이전 페이지로 이동
      navigate(-1);
    }
  };

  return (
    <MainContainer>
      <AccountRow>
        <Col md={6}>
          {/* handleBackClick 함수를 BackBtn에 전달 */}
          <BackBtn onClick={handleBackClick} />
          <TitleText className="mb-4">계정 찾기</TitleText>

          {/* ID 찾기 및 비밀번호 재설정 버튼 */}
          {!isFindingID && !isResettingPW && (
            <>
              <SubmitBtn className="mb-2" onClick={handleFindID}>
                ID 찾기
              </SubmitBtn>
              <SubmitBtn className="mb-2" onClick={handleResetPW}>
                비밀번호 재설정
              </SubmitBtn>
            </>
          )}

          {/* ID 찾기 폼 */}
          {isFindingID && (
            <Form onSubmit={findingSameIdHandler}>
              {/* 전화번호 입력 */}
              <TelInput
                phone={phone}
                setPhone={setPhone}
                phoneValid={phoneValid}
                setPhoneValid={setPhoneValid}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                showVerifyButton={false}
              />
              {errorMessage && <ErrorText errtxt={errorMessage} />}
              <SubmitBtn type="submit">ID 확인</SubmitBtn>
            </Form>
          )}

          {/* PW 재설정 폼 */}
          {isResettingPW && (
            <Form onSubmit={sendResetLinkHandler}>
              <EmailInput
                email={email}
                setEmail={setEmail}
                emailValid={emailValid}
                setEmailValid={setEmailValid}
                emailVerified={emailVerified}
                setEmailVerified={setEmailVerified}
                showCodeInput={false}
                showTimer={false}
              />
              {errorMessage && <ErrorText errtxt={errorMessage} />}
              <SubmitBtn type="submit" disabled={!canSendLink}>
                PW 재설정 링크 전송
              </SubmitBtn>
            </Form>
          )}
        </Col>
      </AccountRow>
    </MainContainer>
  );
};
