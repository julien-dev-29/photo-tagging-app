import { Outlet } from "react-router";
import Timer from "../components/organisms/Timer";
import styled from "styled-components";

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #111c1b;
`;

function GameLayout() {
  return (
    <StyledContainer>
      <Timer />
      <Outlet />
    </StyledContainer>
  );
}

export default GameLayout;
