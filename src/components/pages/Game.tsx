import { useEffect, useState, type FormEvent } from "react";
import { Modal } from "../organisms/Modal";
import type { Character } from "../../types/types";
import { Alert } from "../organisms/Alert";
import styled from "styled-components";
import Image from "../molecules/Image";
import { useOutletContext } from "react-router";

const StyledContainer = styled.div``;

function Game() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("");
  const [characterLeft, setCharacterLeft, isFinished, setIsFinished] =
    useOutletContext<
      [
        number,
        React.Dispatch<React.SetStateAction<number>>,
        boolean,
        React.Dispatch<React.SetStateAction<boolean>>
      ]
    >();
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch("http://localhost:3000/");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setCharacters(data);
        setIsLoading(false);
      } catch (error) {
        setError(error as string);
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  const handleAnswer = async (e: FormEvent, characterId: string) => {
    e.preventDefault();
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
      setAlertType(data.message);
      if (data.message === "Success!") {
        setCharacters((prev) =>
          prev.map((character) =>
            character.id === characterId
              ? { ...character, found: true }
              : character
          )
        );
        if (characterLeft === 1) {
          setIsFinished(true);
        }
        setCharacterLeft((prev) => prev - 1);
      }
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError(String(error));
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (error.length > 0) return <div>Alert</div>;

  return (
    <StyledContainer>
      {alertType.length > 0 && (
        <Alert alertType={alertType} setAlertType={setAlertType}></Alert>
      )}
      <Image setIsOpen={setIsOpen} setPosition={setPosition}>
        <Modal
          isOpen={isOpen}
          position={position}
          characters={characters}
          handleAnswer={handleAnswer}
        ></Modal>
      </Image>
    </StyledContainer>
  );
}

export default Game;
