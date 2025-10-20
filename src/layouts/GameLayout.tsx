import styled from "styled-components";
import GameHeader from "../components/organisms/GameHeader";
import { useState } from "react";
import EndGame from "../components/pages/EndGame";
import { Outlet } from "react-router";

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #111c1b;
`;

function GameLayout() {
  const [characterLeft, setCharacterLeft] = useState<number>(5);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  if (isFinished) {
    return <EndGame totalSeconds={totalSeconds} />;
  }
  return (
    <StyledContainer>
      <GameHeader
        characterLeft={characterLeft}
        totalSeconds={totalSeconds}
        setTotalSeconds={setTotalSeconds}
      />
      <Outlet
        context={[characterLeft, setCharacterLeft, isFinished, setIsFinished]}
      />
    </StyledContainer>
  );
}

export default GameLayout;
