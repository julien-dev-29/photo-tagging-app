import { NavLink } from "react-router";
import Timer from "./Timer";
import styled from "styled-components";

type Props = {
  characterLeft: number;
  totalSeconds: number;
  setTotalSeconds: React.Dispatch<React.SetStateAction<number>>;
};

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledNavlink = styled(NavLink)`
  margin-left: 24px;
`;

function GameHeader({ characterLeft, setTotalSeconds, totalSeconds }: Props) {
  return (
    <StyledHeader>
      <StyledNavlink to="/">Back</StyledNavlink>
      <div>
        There are {characterLeft} character{characterLeft > 1 ? "s" : ""} left
        to find
      </div>
      <Timer setTotalSeconds={setTotalSeconds} totalSeconds={totalSeconds} />
    </StyledHeader>
  );
}

export default GameHeader;
