import { useState } from "react";
import styled from "styled-components";

type Position = {
  x: number;
  y: number;
};

type Props = {
  isOpen: boolean;
  position: Position;
};

const StyledModal = styled.div<{
  $isOpen?: boolean;
  $position: Position;
}>`
  position: absolute;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  top: ${(props) => props.$position.y + "px"};
  left: ${(props) => props.$position.x + "px"};
`;

export function Modal({ isOpen, position }: Props) {
  const [answer, setAnswer] = useState("");
  const [characters] = useState([
    {
      id: crypto.randomUUID(),
      name: "Jurol",
    },
    {
      id: crypto.randomUUID(),
      name: "Maël",
    },
    {
      id: crypto.randomUUID(),
      name: "Marie",
    },
  ]);
  const handleAnswer = () => {};
  return (
    <StyledModal
      onClick={(e) => e.stopPropagation()}
      $isOpen={isOpen}
      $position={position}
    >
      <form>
        <select
          name="answer"
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        >
          {characters.map((character) => (
            <option value={character.name} key={character.id}>
              {character.name}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleAnswer}>
          Validate
        </button>
      </form>
    </StyledModal>
  );
}
