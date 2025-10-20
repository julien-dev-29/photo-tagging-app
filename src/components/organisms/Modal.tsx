import { useRef, type FormEvent } from "react";
import styled from "styled-components";
import type { Character, Position } from "../../types/types";
import { useCharacterSelect } from "../../hooks/useCharacterSelect";
import { Check, CircleQuestionMark } from "lucide-react";

type Props = {
  isOpen: boolean;
  position: Position;
  characters: Character[];
  handleAnswer: (e: FormEvent, characterId: string) => void;
};

const StyledForm = styled.form`
  margin-top: 16px;
  display: flex;
  gap: 8px;
  justify-content: space-evenly;
  align-items: center;
`;

const StyldeButton = styled.button`
  border-radius: 5px;
  padding: 8px 12px;
  border: none;
  background-color: #12a594;
  color: white;
  transition: transform 50ms ease-in;
  &:hover {
    background-color: #0eb39e;
  }
  &:active {
    background-color: #12a594;
    transform: scale(0.98);
  }
`;

const StyledModal = styled.div<{ $position: Position }>`
  position: absolute;
  top: ${(props) => props.$position.y + "px"};
  left: ${(props) => props.$position.x + "px"};
  background-color: #0d2d2a;
  padding: 32px;
  border: 1px solid #145750;
  border-radius: 5px;
  z-index: 1000;
  & form {
  }
  & select,
  ::picker(select) {
    appearance: base-select;
  }
  & select::picker-icon {
    color: #0bd8b6;
    transition: 0.4s rotate;
  }
  & select:open::picker-icon {
    rotate: 180deg;
  }
  & select {
    font-family: sans-serif;
    font-size: 0.8rem;
    padding: 6px 12px;
    border: 1px solid #145750;
    border-radius: 5px;
    color: #0bd8b6;
    background-color: #023b37;
  }
  & select:hover,
  & select:focus {
    background-color: #084843;
  }
  & select:focus {
  }
  & option {
    border: none;
    background-color: #0d2d2a;
    color: #0bd8b6;
    padding: 10px;
  }
  & option:hover {
    background-color: #084843;
    color: #0bd8b6;
    transition: 100ms;
  }
  & ::picker(select) {
    border-radius: 5px;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export function Modal({ isOpen, position, characters, handleAnswer }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { characterId, setCharacterId, hasAvailableCharacters } =
    useCharacterSelect(characters);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!characterId) return;
    handleAnswer(e, characterId);
  };

  if (!isOpen) return null;

  return (
    <StyledModal
      ref={modalRef}
      $position={position}
      onClick={(e) => e.stopPropagation()}
    >
      {characters.map((c) => (
        <StyledDiv key={c.id}>
          {c.name}
          {c.found ? <Check /> : <CircleQuestionMark />}
        </StyledDiv>
      ))}
      <StyledForm onSubmit={handleSubmit}>
        <select
          id="answer"
          value={characterId ?? ""}
          onChange={(e) => setCharacterId(e.target.value)}
          disabled={!hasAvailableCharacters}
        >
          {characters
            .filter((c) => !c.found)
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>
        <StyldeButton type="submit">Valider</StyldeButton>
      </StyledForm>
    </StyledModal>
  );
}
