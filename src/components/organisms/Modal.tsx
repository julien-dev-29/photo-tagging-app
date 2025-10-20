import { useRef, type FormEvent } from "react";
import styled from "styled-components";
import type { Character, Position } from "../../types/types";
import { useCharacterSelect } from "../../hooks/useCharacterSelect";

type Props = {
  isOpen: boolean;
  position: Position;
  characters: Character[];
  handleAnswer: (e: FormEvent, characterId: string) => void;
};

const StyledModal = styled.div<{ $position: Position }>`
  position: absolute;
  top: ${(props) => props.$position.y + "px"};
  left: ${(props) => props.$position.x + "px"};
  background: white;
  padding: 10px;
  border: 1px solid #ccc;
  z-index: 1000;
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
      {characters
        .filter((c) => c.found)
        .map((c) => (
          <div key={c.id}>{c.name}✅</div>
        ))}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Valider</button>
      </form>
    </StyledModal>
  );
}
