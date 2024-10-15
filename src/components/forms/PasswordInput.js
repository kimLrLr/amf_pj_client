import React, { useEffect, useState } from "react";
import { FormControl, FormGroup, FormLabel } from "../../style/common";
import { ErrorText } from "../ErrorText";

export const PasswordInput = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  passwordValid,
  setPasswordValid,
  passwordLengthValid,
  setPasswordLengthValid,
}) => {
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  // 비밀번호 유효성 검사
  useEffect(() => {
    // 비밀번호 정규식
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    // 특수문자, 영문자, 숫자가 포함되었는지 확인
    setPasswordValid(passwordRegex.test(password));
    // 비밀번호 길이 유효성 확인
    setPasswordLengthValid(password.length >= 8);
  }, [password, setPasswordValid, setPasswordLengthValid]);

  return (
    <>
      {/* 비밀번호 입력 */}
      <FormGroup controlId="formBasicPassword">
        <FormLabel>비밀번호</FormLabel>
        <FormControl
          type="password"
          placeholder="특수문자, 영문자, 숫자를 포함하여 8자 이상"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
      <FormGroup controlId="formBasicConfirmPassword">
        <FormLabel>비밀번호 확인</FormLabel>
        <FormControl
          type="password"
          placeholder="비밀번호 재입력"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {password !== confirmPassword && confirmPassword.length > 0 && (
          <ErrorText errtxt="* 비밀번호가 일치하지 않습니다." />
        )}
      </FormGroup>
    </>
  );
};
