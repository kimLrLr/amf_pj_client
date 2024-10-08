import { Form } from "react-bootstrap";
import styled from "styled-components";

const ErrorText = styled.small`
  line-height: 18px;
  font-size: 14px;
  color: #dc3545;
`;

const FormInput = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  children, // 버튼 등을 추가로 넘길 수 있도록 children 사용
  disabled = false,
}) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <div className="d-flex">
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {children} {/* 버튼이나 추가 요소를 받기 위한 부분 */}
    </div>
    {error && <ErrorText>{error}</ErrorText>}
  </Form.Group>
);

export default FormInput;
