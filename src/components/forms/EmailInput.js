import React, { useState, useEffect } from "react";
import {
  CheckBtn,
  FormControl,
  FormGroup,
  FormLabel,
} from "../../style/common";
import { ErrorText } from "../ErrorText";
import { AlertTxt } from "..//AlertTxt";
import { TimerText } from "../../style/eventText";
import {
  checkEmailExists,
  sendEmailVerification,
  verifyEmailCode,
} from "../../api";

export const EmailInput = ({
  email,
  setEmail,
  emailValid,
  setEmailValid,
  emailVerified,
  setEmailVerified,
  authCode,
  setAuthCode,
  inputCode,
  setInputCode,
  timer,
  setTimer,
  showCodeInput = true, // 기본값으로 인증 코드 입력 필드를 보이도록 설정
  showTimer = true, // 기본값으로 타이머를 보이도록 설정
  readOnly = false, // 기본값은 이메일 수정 가능, 회원가입 이후에는 true로 설정
}) => {
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [emailExists, setEmailExists] = useState(false); // 이메일 중복 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // 이메일 유효성 검사
  useEffect(() => {
    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    setEmailValid(emailRegex.test(email));
  }, [email, setEmailValid]);

  // 이메일 중복 확인 및 인증 이메일 발송
  const handleSendEmail = async () => {
    if (emailValid) {
      try {
        setIsLoading(true);
        await checkEmailExists(email); // 이메일 중복 확인
        await sendEmailVerification(email); // 인증 이메일 발송
        setTimer(300); // 5분 타이머 시작
        setEmailVerified(false);
        console.log("인증번호가 전송되었습니다.");
      } catch (error) {
        setEmailExists(true); // 중복 에러 처리
        console.error("이메일 확인 또는 전송 실패:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  // 이메일 입력 변경 시 에러 메시지 초기화
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailExists(false); // 이메일 입력 시 에러 메시지 숨김
  };

  // 타이머 설정
  useEffect(() => {
    if (timer > 0 && !emailVerified) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer, emailVerified, setTimer, showTimer]);

  // 남은 시간 형식 변환
  const formatTime = (time) => {
    const min = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };

  // 인증 코드 입력 시 공백 제거
  const removeInputBlankHandler = (e) => {
    const removeBlankCode = e.target.value.replace(/\s/g, "");
    setInputCode(removeBlankCode);
  };

  // 이메일 인증 코드 확인
  const verifyEmailHandler = async () => {
    try {
      await verifyEmailCode(email, inputCode); // 인증 코드 확인
      setEmailVerified(true);
      console.log("이메일 인증 성공");
    } catch (error) {
      setAuthCode(false);
      console.error("인증 실패:", error);
    }
  };

  return (
    <>
      {/* 이메일 입력 및 인증 */}
      <FormGroup controlId="formBasicEmail">
        <FormLabel>이메일</FormLabel>
        <div className="d-flex">
          <FormControl
            type="email"
            placeholder="이메일 형식으로 입력해주세요."
            value={email}
            onChange={handleEmailChange}
            onBlur={() => setIsEmailTouched(true)}
            disabled={emailVerified || readOnly}
          />
          {showCodeInput && (
            <CheckBtn
              variant="outline-primary"
              onClick={handleSendEmail}
              disabled={emailVerified || !emailValid || isLoading}
            >
              {emailVerified ? "확인됨" : "인증"}
            </CheckBtn>
          )}
        </div>
        {!emailValid && isEmailTouched && (
          <>
            <ErrorText errtxt="* 올바른 이메일 주소를 입력해주세요." />
            <ErrorText errtxt="* ex) your_email@email.com" />
          </>
        )}
        {emailExists && (
          <ErrorText errtxt="* 이미 가입 정보가 있는 메일입니다." />
        )}
        {showTimer && timer > 0 && !emailVerified && (
          <TimerText>{formatTime(timer)}</TimerText>
        )}
        {emailVerified && <AlertTxt alerttxt="이메일이 인증되었습니다." />}
      </FormGroup>

      {/* 이메일 인증 코드 입력 */}
      {showCodeInput && (
        <FormGroup controlId="formBasicEmailCode">
          <FormLabel>이메일 인증 번호</FormLabel>
          <div className="d-flex">
            <FormControl
              type="text"
              placeholder="인증번호 입력"
              value={inputCode}
              onChange={removeInputBlankHandler}
              disabled={emailVerified || timer <= 0}
            />
            <CheckBtn
              variant={emailVerified ? "success" : "outline-primary"}
              onClick={verifyEmailHandler}
              disabled={emailVerified || timer <= 0}
            >
              {emailVerified ? "인증됨" : "확인"}
            </CheckBtn>
          </div>
          {emailVerified ? (
            <AlertTxt alerttxt="이메일이 인증되었습니다." />
          ) : (
            !authCode && <ErrorText errtxt="* 유효하지 않은 인증번호입니다." />
          )}
        </FormGroup>
      )}
    </>
  );
};
