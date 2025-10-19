import { useEffect, useState } from "react";
import { Modal } from "../organisms/Modal";
import type { Character } from "../../types/types";
import { Hitbox } from "./Hitbox";

function Game() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
    const handleClick = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
      setIsOpen((prev) => !prev);
    };
    window.addEventListener("click", handleClick);
    fetchCharacters();
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (error.length > 0) return <div>Alert</div>;

  return (
    <div>
      <h1>Game</h1>
      {characters.map((character) => (
        <Hitbox key={character.id} character={character}></Hitbox>
      ))}
      <Modal
        isOpen={isOpen}
        position={position}
        characters={characters}
      ></Modal>
    </div>
  );
}

export default Game;
