import styled from "styled-components";

const ErrText = styled.small`
  line-height: 18px;
  font-size: 14px;
  color: #dc3545;
`;

export const ErrorText = ({ errtxt }) => {
  return <ErrText>{errtxt}</ErrText>;
};
