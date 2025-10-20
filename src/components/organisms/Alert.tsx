import { useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  alertType: string;
  setAlertType: React.Dispatch<React.SetStateAction<string>>;
};

const StyledAlertSuccess = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 25px;
  left: 25px;
  border: 1px solid #145750;
  padding: 16px;
  background-color: #0d2d2a;
  border-radius: 5px;
  color: #adf0dd;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity ease-out 500ms;
`;

const StyledAlertFail = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 25px;
  left: 25px;
  border: 1px solid #72232D;
  padding: 16px;
  background-color: #3B1219;
  border-radius: 5px;
  color: #FFD1D9;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity ease-out 500ms;
`;

export function Alert({ alertType, setAlertType }: Props) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (alertType) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setAlertType("");
        }, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertType, setAlertType]);

  if (!alertType) return null;

  if (alertType === "Success!") {
    return (
      <StyledAlertSuccess $isVisible={isVisible}>
        {alertType}
      </StyledAlertSuccess>
    );
  } else {
    return (
      <StyledAlertFail $isVisible={isVisible}>{alertType}</StyledAlertFail>
    );
  }
}
