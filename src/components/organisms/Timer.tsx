import { useEffect } from "react";
import styled from "styled-components";

type Props = {
  totalSeconds: number;
  setTotalSeconds: React.Dispatch<React.SetStateAction<number>>;
};

const StyledContainer = styled.div`
  margin-right: 24px;
  padding: 16px;
  border: 1px solid #145750;
  background-color: #0d2d2a;
  color: #0bd8b6;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  font-family: monospace;
  font-size: 24px;
`;

function Timer({ totalSeconds, setTotalSeconds }: Props) {
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTotalSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [setTotalSeconds]);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <StyledContainer>
      <div>{minutes.toString().padStart(2, "0")}</div>
      <div>:</div>
      <div>{seconds.toString().padStart(2, "0")}</div>
    </StyledContainer>
  );
}

export default Timer;
