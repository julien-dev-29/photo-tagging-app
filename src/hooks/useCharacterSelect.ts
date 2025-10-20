import { useEffect, useState } from "react";
import type { Character } from "../types/types";

export function useCharacterSelect(characters: Character[]) {
  const [characterId, setCharacterId] = useState<Character["id"] | null>(null);

  useEffect(() => {
    const available = characters.filter((c) => !c.found);
    setCharacterId(available.length > 0 ? available[0].id : null);
  }, [characters]);

  const selectedCharacter = characters.find((c) => c.id === characterId) ?? null;

  return {
    characterId,
    setCharacterId,
    selectedCharacter,
    hasAvailableCharacters: characters.some((c) => !c.found),
  };
}
