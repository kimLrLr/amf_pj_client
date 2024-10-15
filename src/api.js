const baseUrl = "http://localhost:8080/";

const apiRequest = async (endpoint, method, body) => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const result = await response.json(); // 응답 데이터를 JSON으로 변환

    if (!response.ok) {
      // 응답이 OK가 아닐 때 에러 메시지 출력
      throw new Error(result.message || `${method} 요청 실패`);
    }

    return result; // 변환된 데이터를 반환
  } catch (error) {
    console.error("서버 오류:", error);
    throw error;
  }
};

// 회원가입
export const registerUser = async (userData) => {
  return await apiRequest("register", "POST", userData);
};

// 이메일 중복 확인
export const checkEmailExists = async (email) => {
  return await apiRequest("check-email", "POST", { email });
};

// 인증 이메일 전송
export const sendEmailVerification = async (email) => {
  return await apiRequest("send-email", "POST", { email });
};

// 인증 코드 확인
export const verifyEmailCode = async (email, code) => {
  return await apiRequest("verify-code", "POST", { email, code });
};

// 전화번호 중복 확인
export const checkPhoneExists = async (countryCode, phone) => {
  return await apiRequest("check-phone", "POST", { countryCode, phone });
};

// 로그인
export const loginUser = async (email, password) => {
  return await apiRequest("login", "POST", { email, password });
};

// ID 찾기
export const findIdByPhone = async (phone, countryCode) => {
  return await apiRequest("find-id", "POST", { phone, countryCode });
};

// 비밀번호 재설정 링크 전송
export const sendResetLink = async (email) => {
  return await apiRequest("send-reset-link", "POST", { email });
};

// 비밀번호 재설정
export const resetPassword = async (userId, newPassword) => {
  return await apiRequest("reset-password", "POST", {
    userId,
    password: newPassword,
  });
};
