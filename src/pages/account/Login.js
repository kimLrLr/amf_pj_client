import { useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BtnCom } from "../../components/BtnCom";
import { BackBtn } from "../../components/BackBtn";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log("로그인 성공");
        navigate("/"); // 로그인 성공 시 메인 페이지로 이동
      } else {
        const result = await response.json();
        setErrorMessage(result); // 에러 메시지 설정
        console.error("로그인 실패:", result);
      }
    } catch (error) {
      console.error("서버 오류:", error);
      setErrorMessage("서버 오류가 발생했습니다.");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="justify-content-md-center w-100">
        <Col md={6}>
          <h2 className="text-center">로그인</h2>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}{" "}
          {/* 에러 메시지 출력 */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>이메일(ID)</Form.Label>
              <Form.Control
                type="email"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <BtnCom
              btnName="로그인"
              btnVariant="primary"
              btnType="submit"
              btnClass="w-100 mb-3"
            />

            <BtnCom
              btnName="회원가입"
              btnVariant="link"
              btnClass="w-100"
              btnLink="join"
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
