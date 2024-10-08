import { Form } from "react-bootstrap";
import { ErrorText } from "../../../components/ErrorText";

const FormInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled,
}) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
    />
    {error && <ErrorText errtxt={error} />}
  </Form.Group>
);

export default FormInput;
