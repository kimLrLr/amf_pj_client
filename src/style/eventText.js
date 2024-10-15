import { Alert } from "react-bootstrap";
import styled from "styled-components";
import media from "./media";

// alert txt (AlertTxt)
export const AlertMsg = styled(Alert)`
  @media ${media.tablet} {
    font-size: 14px;
  }

  @media ${media.mobile} {
    font-size: 13px;
    padding: 12px;
  }
  @media ${media.smallScreen} {
    font-size: 12px;
    padding: 10px;
  }
`;

// error txt (ErrorText)
export const ErrText = styled.small`
  line-height: 18px;
  font-size: 14px;
  color: #dc3545;

  @media ${media.tablet} {
    font-size: 13px;
  }

  @media ${media.mobile} {
    font-size: 12px;
  }
  @media ${media.smallScreen} {
    font-size: 11px;
    line-height: 13px;
  }
`;

// timer
export const TimerText = styled.small`
  color: #777;

  @media ${media.tablet} {
    font-size: 15px;
  }

  @media ${media.mobile} {
    font-size: 14px;
  }
  @media ${media.smallScreen} {
    font-size: 12px;
  }
`;
