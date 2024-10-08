import { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "../../../style/common.css";
import { BackBtn } from "../../../components/BackBtn";

export const FindAccount = () => {
  const [isFindingID, setIsFindingID] = useState(false);
  const [isResettingPW, setIsResettingPW] = useState(false);

  const handleFindID = () => {
    setIsFindingID(true);
    setIsResettingPW(false);
  };

  const handleResetPW = () => {
    setIsFindingID(false);
    setIsResettingPW(true);
  };

  return (
    <Container className="account_div">
      <Row className="account_row">
        <Col md={6}>
          <BackBtn />
          <h2 className="mb-3">계정 찾기</h2>

          {/* ID 찾기 및 비밀번호 재설정 버튼 */}
          {!isFindingID && !isResettingPW && (
            <>
              <Button
                variant="primary"
                className="w-100 mb-3"
                onClick={handleFindID}
              >
                ID 찾기
              </Button>
              <Button
                variant="primary"
                className="w-100 mb-3"
                onClick={handleResetPW}
              >
                PW 재설정
              </Button>
            </>
          )}

          {/* ID 찾기 폼 */}
          {isFindingID && (
            <Form>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>이름을 입력해주세요.</Form.Label>
                <Form.Control type="text" placeholder="이름 입력" />
              </Form.Group>
              <Button variant="primary" className="w-100">
                ID 찾기
              </Button>
            </Form>
          )}

          {/* PW 재설정 폼 */}
          {isResettingPW && (
            <Form>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label>이메일을 입력해주세요.</Form.Label>
                <Form.Control type="email" placeholder="이메일 입력" />
              </Form.Group>
              <Button variant="primary" className="w-100">
                PW 재설정 링크 전송
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};
