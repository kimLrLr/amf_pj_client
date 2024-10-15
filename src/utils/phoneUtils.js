// 전화번호 형식 처리 함수
export const formatPhoneNumber = (input, countryCode) => {
  let formattedInput = input.replace(/[^0-9]/g, ""); // 숫자만 허용

  if (countryCode === "+82") {
    // 한국
    if (formattedInput.length > 3 && formattedInput.length <= 7) {
      formattedInput =
        formattedInput.slice(0, 3) + "-" + formattedInput.slice(3);
    } else if (formattedInput.length > 7) {
      formattedInput =
        formattedInput.slice(0, 3) +
        "-" +
        formattedInput.slice(3, 7) +
        "-" +
        formattedInput.slice(7);
    }
  } else if (countryCode === "+1") {
    // 미국
    if (formattedInput.length > 3 && formattedInput.length <= 6) {
      formattedInput =
        formattedInput.slice(0, 3) + "-" + formattedInput.slice(3);
    } else if (formattedInput.length > 6) {
      formattedInput =
        formattedInput.slice(0, 3) +
        "-" +
        formattedInput.slice(3, 6) +
        "-" +
        formattedInput.slice(6);
    }
  } else if (countryCode === "+44") {
    // 영국
    if (formattedInput.length > 4 && formattedInput.length <= 7) {
      formattedInput =
        formattedInput.slice(0, 4) + "-" + formattedInput.slice(4);
    } else if (formattedInput.length > 7) {
      formattedInput =
        formattedInput.slice(0, 4) +
        "-" +
        formattedInput.slice(4, 7) +
        "-" +
        formattedInput.slice(7);
    }
  } else if (countryCode === "+86") {
    // 중국
    if (formattedInput.length > 3) {
      formattedInput =
        formattedInput.slice(0, 3) + "-" + formattedInput.slice(3);
    }
  } else if (countryCode === "+91") {
    // 인도
    if (formattedInput.length > 5) {
      formattedInput =
        formattedInput.slice(0, 5) + "-" + formattedInput.slice(5);
    }
  } else if (countryCode === "+81") {
    // 일본
    if (formattedInput.length > 3) {
      formattedInput =
        formattedInput.slice(0, 3) + "-" + formattedInput.slice(3);
    }
  }

  return formattedInput;
};

// 전화번호 유효성 검사 함수
export const validatePhoneNumber = (phone, countryCode) => {
  const regPhone =
    countryCode === "+82"
      ? /^01([0|1|6|7|8|9])-(\d{3,4})-(\d{4})$/ // 한국 전화번호
      : countryCode === "+1"
      ? /^\d{3}-\d{3}-\d{4}$/ // 미국 전화번호
      : countryCode === "+44"
      ? /^\d{4}-\d{6,7}$/ // 영국 전화번호
      : countryCode === "+86"
      ? /^\d{3}-\d{8}$/ // 중국 전화번호
      : countryCode === "+91"
      ? /^\d{5}-\d{5}$/ // 인도 전화번호
      : countryCode === "+81"
      ? /^\d{3}-\d{4}-\d{4}$/ // 일본 전화번호
      : null;

  return regPhone ? regPhone.test(phone) : false;
};
