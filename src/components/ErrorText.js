import { ErrText } from "../style/eventText";

export const ErrorText = ({ errtxt }) => {
  return (
    <ErrText>
      <div>{errtxt}</div>
    </ErrText>
  );
};
