import React, { useEffect, useState } from "react";
import { FormControl, FormGroup, FormLabel } from "../../style/common";
import { ErrorText } from "../ErrorText";

export const AffiliationInput = ({
  affiliation,
  setAffiliation,
  affiliationValid,
  setAffiliationValid,
}) => {
  const [isAffiliationTouched, setIsAffiliationTouched] = useState(false);

  // 소속 유효성 검사 (한글로 자음, 모음만 입력되지 않도록)
  useEffect(() => {
    const affiliationRegex =
      /^(?![ㄱ-ㅎ]+$)(?![ㅏ-ㅣ]+$)(?!.*\s)(?!^$)(?=.*[가-힣a-zA-Z0-9])[가-힣a-zA-Z0-9]+$/;
    setAffiliationValid(affiliationRegex.test(affiliation));
  }, [affiliation, setAffiliationValid]);

  return (
    <FormGroup controlId="formBasicAffiliation">
      <FormLabel>소속</FormLabel>
      <FormControl
        type="text"
        placeholder="소속을 입력하세요."
        value={affiliation}
        onChange={(e) => setAffiliation(e.target.value)}
        onBlur={() => setIsAffiliationTouched(true)}
      />
      {!affiliationValid && isAffiliationTouched && (
        <ErrorText errtxt="* 소속을 정확하게 입력해주세요." />
      )}
    </FormGroup>
  );
};
