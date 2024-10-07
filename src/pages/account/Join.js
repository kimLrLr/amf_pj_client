import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BackBtn } from "../../components/BackBtn";
import styled from "styled-components";

const TitleText = styled.h2`
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
`;

const ErrorText = styled.small`
  line-height: 18px;
  font-size: 14px;
  color: #dc3545;
`;

export const Join = () => {
  // State 설정
  const [email, setEmail] = useState("");

  // 이메일
  const [emailValid, setEmailValid] = useState(true); // 이메일 형식 유효성
  const [isEmailTouched, setIsEmailTouched] = useState(false); // 이메일 입력 여부
  const [inputCode, setInputCode] = useState(""); // 인증번호 입력
  const [emailVerified, setEmailVerified] = useState(false); // 이메일 인증 여부
  const [authCode, setAuthCode] = useState(true);

  const [timer, setTimer] = useState(0); // 타이머

  const [name, setName] = useState(""); // 이름
  const [isNameTouched, setIsNameTouched] = useState(false); // 이름 입력 여부
  const [nameValid, setNameValid] = useState(true); // 이름 확인
  const [nameLengthValid, setNameLengthValid] = useState(true); // 이름 길이 유효성

  const [affiliation, setAffiliation] = useState(""); // 소속
  const [isAffiliationTouched, setIsAffiliationTouched] = useState(false); // 소속 입력 여부
  const [affiliationValid, setAffiliationValid] = useState(true); // 소속값 확인
  const [affiliationLengthValid, setAffiliationLengthValid] = useState(true); // 소속값 길이

  // 비밀번호
  const [password, setPassword] = useState(""); // 비밀번호
  const [passwordValid, setPasswordValid] = useState(true); // 비밀번호 형식 유효성
  const [passwordLengthValid, setPasswordLengthValid] = useState(true); // 비밀번호 길이 유효성
  const [isPasswordTouched, setIsPasswordTouched] = useState(false); // 비밀번호 입력 여부
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인

  const [formValid, setFormValid] = useState(false); // 필드값 검증을 위함(전체 폼 유효성)

  const navigate = useNavigate();

  // 정규식 표현 모음
  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const nameRegex = /([^가-힣\x20a-zA-Z])/i;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  // 이메일 유효성 검사
  useEffect(() => {
    setEmailValid(emailRegex.test(email));
  }, [email]);

  // 이메일 인증 코드 공백 제거
  const removeInputBlankHandler = (e) => {
    const removeBlankCode = e.target.value.replace(/\s/g, ""); // 공백이 들어가지 못하도록
    setInputCode(removeBlankCode);
  };

  // 이름 유효성 검사 (최소 2자 이상 + 한글로 자음, 모음만 입력되지 않도록)
  useEffect(() => {
    setNameValid(nameRegex.test(name));
    // 이름 길이 2자 이상
    setNameLengthValid(name.length >= 2);
  }, [name]);

  // 소속 유효성 검사 (한글로 자음, 모음만 입력되지 않도록)
  useEffect(() => {
    setAffiliationValid(nameRegex.test(affiliation));

    setAffiliationLengthValid(affiliation.length > 0);
  }, [affiliation]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    // 특수문자, 영문자, 숫자가 포함되었는지 확인
    setPasswordValid(passwordRegex.test(password));

    // 비밀번호 길이 유효성 확인
    setPasswordLengthValid(password.length >= 8);
  }, [password]);

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

  // 타이머 설정(인증이 완료된 경우에는 카운트다운을 숨길 수 있도록)
  useEffect(() => {
    if (timer > 0 && !emailVerified) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer, emailVerified]);

  // 남은 시간 형식을 MM:SS 형식으로 변환
  const formatTime = (time) => {
    const min = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };

  // 필드 값 검증 및 회원가입 버튼 활성화 조건
  useEffect(() => {
    if (
      emailVerified &&
      name.trim().length >= 2 &&
      affiliation.trim() !== "" &&
      passwordRegex.test(password) &&
      password === confirmPassword
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [emailVerified, name, affiliation, password, confirmPassword]);

  // 회원가입 처리
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
        console.log("회원가입 성공");
        navigate("/login");
      } else {
        const result = await response.json();
        console.error("회원가입 실패:", result);
      }
    } catch (error) {
      console.error("서버 오류:", error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="justify-content-md-center w-100">
        <Col md={6}>
          {/* 뒤로가기 버튼 */}
          <BackBtn />
          <TitleText>회원가입</TitleText>
          <Form onSubmit={registerHandler}>
            {/* 이메일 입력 및 인증 */}
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>이메일</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="email"
                  placeholder="이메일 형식으로 입력해주세요."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setIsEmailTouched(true)}
                  disabled={emailVerified}
                />
                <Button
                  variant="outline-primary"
                  onClick={sendEmailHandler}
                  disabled={emailVerified || !emailValid}
                >
                  {emailVerified ? "확인됨" : "인증"}
                </Button>
              </div>
              {!emailValid && isEmailTouched && (
                <ErrorText>
                  * 올바른 이메일 주소를 입력해주세요. ex) your_email@email.com
                </ErrorText>
              )}
              {timer > 0 && !emailVerified && (
                <small>{formatTime(timer)}</small>
              )}
            </Form.Group>

            {/* 이메일 인증 코드 입력 */}
            <Form.Group controlId="formBasicEmailCode" className="mb-3">
              <Form.Label>이메일 인증 번호</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="인증번호 입력"
                  value={inputCode}
                  onChange={removeInputBlankHandler} //공백 제거 처리를 위한 handler 추가
                  disabled={emailVerified || timer <= 0}
                />
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
                !authCode && (
                  <ErrorText>* 유효하지 않은 인증번호입니다.</ErrorText>
                )
              )}
            </Form.Group>

            {/* 이름 입력 */}
            <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                placeholder="이름을 입력하세요."
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setIsNameTouched(true)}
              />
              {!nameLengthValid && isNameTouched && (
                <ErrorText>* 이름은 최소 2자 이상이어야 합니다.</ErrorText>
              )}
              {nameLengthValid && isNameTouched && nameValid && (
                <ErrorText>* 이름을 정확하게 입력해주세요.</ErrorText>
              )}
            </Form.Group>

            {/* 소속 입력 */}
            <Form.Group controlId="formBasicAffiliation" className="mb-3">
              <Form.Label>소속</Form.Label>
              <Form.Control
                type="text"
                placeholder="소속을 입력하세요."
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
                onBlur={() => setIsAffiliationTouched(true)}
              />
              {!affiliationLengthValid && isAffiliationTouched && (
                <ErrorText>* 소속은 필수 입력값입니다.</ErrorText>
              )}
              {affiliationLengthValid &&
                isAffiliationTouched &&
                affiliationValid && (
                  <ErrorText>* 소속을 정확하게 입력해주세요.</ErrorText>
                )}
            </Form.Group>

            {/* 비밀번호 입력 */}
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="특수문자, 영문자, 숫자를 포함하여 8자 이상"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setIsPasswordTouched(true)}
              />
              {!passwordValid && isPasswordTouched && passwordLengthValid && (
                <ErrorText>* 특수문자, 영문자, 숫자를 포함해주세요.</ErrorText>
              )}
              {!passwordLengthValid && isPasswordTouched && (
                <ErrorText>* 비밀번호는 8자 이상이어야 합니다.</ErrorText>
              )}
            </Form.Group>

            {/* 비밀번호 확인 */}
            <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호 재입력"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {password !== confirmPassword && confirmPassword.length > 0 && (
                <ErrorText>* 비밀번호가 일치하지 않습니다.</ErrorText>
              )}
            </Form.Group>

            {/* 회원가입 버튼 */}
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={!formValid}
            >
              회원가입
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
