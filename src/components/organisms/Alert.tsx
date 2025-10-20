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
  border: 1px solid #adddc0;
  padding: 16px;
  background-color: #e6f6eb;
  border-radius: 5px;
  color: #218358;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity ease-out 500ms;
`;

const StyledAlertFail = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 25px;
  left: 25px;
  border: 1px solid #fdbdbe;
  padding: 16px;
  background-color: #feebec;
  border-radius: 5px;
  color: #641723;
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
