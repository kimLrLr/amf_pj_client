import styled from "styled-components";
import { Form, Button, Container, Row } from "react-bootstrap";
import media from "./media";
import colors from "./colors";

export const AccountRow = styled(Row)`
  width: 80vw;
  display: flex;
  justify-content: center;
`;

export const MainContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${media.mobile} {
    ${AccountRow} {
      min-width: 310px;
      width: 60vw;
    }
  }
`;

// title text
export const TitleText = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 20px;

  @media ${media.mobile} {
    margin-bottom: 18px;
  }
  @media ${media.smallScreen} {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

// form group
export const FormGroup = styled(Form.Group)`
  margin-bottom: 16px;

  @media ${media.smallScreen} {
    margin-bottom: 12px;
  }
`;

//input
export const FormControl = styled(Form.Control)`
  @media ${media.tablet} {
    font-size: 14px;
    &::placeholder {
      font-size: 14px;
    }
  }

  @media ${media.mobile} {
    font-size: 13px;
    &::placeholder {
      font-size: 13px;
    }
  }
  @media ${media.smallScreen} {
    font-size: 12px;
    &::placeholder {
      font-size: 12px;
    }
  }
`;

//form title
export const FormLabel = styled(Form.Label)`
  @media ${media.smallScreen} {
    font-size: 14px;
  }
`;

// form submit button
export const SubmitBtn = styled(Button)`
  width: 100%;
  /* &&를 사용하여 우선순위를 높여 커스텀! */
  && {
    background-color: ${colors.mainColor};
    border-color: ${colors.mainColor};
  }
  @media ${media.smallScreen} {
    font-size: 14px;
  }
`;

// Select 컴포넌트 추가
export const FormSelect = styled(Form.Select)`
  margin-right: 8px;
  width: 30%; /* 드롭다운 너비 조정 */

  @media ${media.tablet} {
    font-size: 14px;
  }

  @media ${media.mobile} {
    font-size: 13px;
    width: 40%;
  }

  @media ${media.smallScreen} {
    font-size: 12px;
  }
`;

// button
export const CheckBtn = styled(Button)`
  @media ${media.tablet} {
    font-size: 14px;
  }

  @media ${media.mobile} {
    font-size: 13px;
  }
  @media ${media.smallScreen} {
    font-size: 12px;
  }
`;

// ButtonGroup
export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin-top: 20px;
`;
