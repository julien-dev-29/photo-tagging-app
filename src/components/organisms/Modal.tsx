import { useEffect, useState } from "react";
import styled from "styled-components";
import type { Character, Position } from "../../types/types";
import { Alert } from "./Alert";

type Props = {
  isOpen: boolean;
  position: Position;
  characters: Character[];
};

const StyledModal = styled.div<{ $position: Position }>`
  position: absolute;
  top: ${(props) => props.$position.y + "px"};
  left: ${(props) => props.$position.x + "px"};
`;

export function Modal({ isOpen, position, characters }: Props) {
  const [characterId, setCharacterId] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (characters.length > 0) setCharacterId(characters[0].id);
  }, [characters]);
  const handleAnswer = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/check", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          characterId: characterId,
          x: position.x,
          y: position.y,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage(data.message);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError(String(error));
      setIsLoading(false);
    }
  };
  if (isOpen) return;
  if (message.length > 0) return <Alert message={message}></Alert>;
  return (
    <StyledModal onClick={(e) => e.stopPropagation()} $position={position}>
      <form>
        <select
          id="answer"
          value={characterId}
          onChange={(e) => setCharacterId(e.target.value)}
        >
          {characters.map((character) => (
            <option value={character.id} key={character.id}>
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
