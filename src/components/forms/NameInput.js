import React, { useEffect, useState } from "react";
import { FormControl, FormGroup, FormLabel } from "../../style/common";
import { ErrorText } from "../ErrorText";

export const NameInput = ({ name, setName, nameValid, setNameValid }) => {
  const [isNameTouched, setIsNameTouched] = useState(false);

  // 이름 유효성 검사
  useEffect(() => {
    const nameRegex = /^[가-힣]{2,}$|^[a-zA-Z\s]{2,}$/;
    setNameValid(nameRegex.test(name));
  }, [name, setNameValid]);

  return (
    <FormGroup controlId="formBasicName">
      <FormLabel>이름</FormLabel>
      <FormControl
        type="text"
        placeholder="이름을 입력하세요."
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => setIsNameTouched(true)}
      />
      {!nameValid && isNameTouched && (
        <ErrorText errtxt="* 이름을 정확하게 입력해주세요." />
      )}
    </FormGroup>
  );
};
