import styled from "styled-components";
import type { Character } from "../../types/types";

type Props = {
  character: Character;
};

const StyledHitbox = styled.div<{ $character: Character }>`
  position: absolute;
  top: ${(props) => props.$character.yMin + "px"};
  left: ${(props) => props.$character.xMin + "px"};
  &:hover {
    cursor: pointer;
  }
`;

export function Hitbox({ character }: Props) {
  return <StyledHitbox $character={character}>{character.name}</StyledHitbox>;
}
