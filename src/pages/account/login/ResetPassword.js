import { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      // 서버로 비밀번호 재설정 API 호출
      console.log("비밀번호 재설정 완료");
    } else {
      console.error("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">비밀번호 재설정</h2>
          <Form onSubmit={handlePasswordReset}>
            <Form.Group controlId="formBasicNewPassword" className="mb-3">
              <Form.Label>새 비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="새 비밀번호를 입력해주세요."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 다시 입력해주세요."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              비밀번호 재설정
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
