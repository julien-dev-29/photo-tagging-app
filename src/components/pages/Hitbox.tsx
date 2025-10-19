import styled from "styled-components";
import type { Character } from "../../types/types";

type Props = {
  character: Character;
};

const StyledHitbox = styled.div<{ $character: Character }>`
  position: absolute;
  top: ${(props) => props.$character.y[0] + "px"};
  left: ${(props) => props.$character.x[0] + "px"};
`;

export function Hitbox({ character }: Props) {
  return <StyledHitbox $character={character}>{character.name}</StyledHitbox>;
}
