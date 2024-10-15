import React, { useEffect, useState } from "react";
import {
  CheckBtn,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
} from "../../style/common";
import { ErrorText } from "../ErrorText";
import { AlertTxt } from "../AlertTxt";
import { countryData } from "../../data/countryData";
import { formatPhoneNumber, validatePhoneNumber } from "../../utils/phoneUtils";
import { checkPhoneExists } from "../../api";

export const TelInput = ({
  phone,
  setPhone,
  phoneValid,
  setPhoneValid,
  isPhoneVerified,
  setIsPhoneVerified,
  countryCode,
  setCountryCode,
  showVerifyButton = true,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneExists, setPhoneExists] = useState(false); // 전화번호 중복 상태

  // 선택한 국가에 맞는 전화번호 형식 정의
  const handlePhoneInput = (e) => {
    const input = e.target.value;

    // 전화번호 형식화
    const formattedPhone = formatPhoneNumber(input, countryCode);

    setPhone(formattedPhone);
    setPhoneExists(false); // 전화번호 입력 시 중복 에러 숨겨주기
  };

  // 국가별 전화번호 유효성 검사
  useEffect(() => {
    const isValid = validatePhoneNumber(phone, countryCode);
    setPhoneValid(isValid);
  }, [phone, countryCode, setPhoneValid]);

  // 국가 변경 시 처리
  const handleCountryChange = (e) => {
    setCountryCode(e.target.value); // 선택한 국가 코드로 설정
    setPhone(""); // 국가가 변경되면 전화번호 초기화
  };

  // 전화번호 중복 확인 함수
  const verifyPhoneHandler = async () => {
    setLoading(true);
    try {
      const result = await checkPhoneExists(countryCode, phone);
      if (result.phoneExists) {
        setPhoneExists(true);
      } else {
        setIsPhoneVerified(true);
        setPhoneExists(false);
      }
    } catch (error) {
      console.error("서버 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormGroup controlId="formBasicPhoneGroup" className="mb-3">
      <FormLabel>전화번호</FormLabel>
      <div className="d-flex">
        {/* 국가 코드 선택 드롭다운 */}
        <FormSelect
          value={countryCode}
          onChange={handleCountryChange}
          disabled={isPhoneVerified}
        >
          {countryData.map((country) => (
            <option key={country.code} value={country.code}>
              {country.code} ({country.country})
            </option>
          ))}
        </FormSelect>
        <FormControl
          type="text"
          placeholder={
            countryData.find((c) => c.code === countryCode)?.format ||
            "전화번호 입력"
          }
          value={phone}
          onChange={handlePhoneInput}
          onBlur={() => setIsTouched(true)}
          disabled={isPhoneVerified} // 인증 후에는 수정 불가
        />
        {showVerifyButton && (
          <CheckBtn
            variant={isPhoneVerified ? "success" : "outline-primary"}
            onClick={verifyPhoneHandler}
            disabled={!phoneValid || loading || isPhoneVerified} // 전화번호 인증 후 버튼 비활성화
          >
            {isPhoneVerified ? "확인됨" : "확인"}
          </CheckBtn>
        )}
      </div>
      {!phoneValid && isTouched && (
        <ErrorText
          errtxt={`* ${
            countryData.find((c) => c.code === countryCode)?.country
          } 전화번호 형식에 맞게 입력해주세요.`}
        />
      )}
      {phoneExists && (
        <ErrorText errtxt="* 이미 가입 정보가 있는 전화번호입니다." />
      )}
      {loading && <small>확인 중...</small>}
      {isPhoneVerified && <AlertTxt alerttxt="전화번호가 인증되었습니다." />}
    </FormGroup>
  );
};
