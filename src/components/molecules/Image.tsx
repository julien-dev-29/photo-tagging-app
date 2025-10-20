import type React from "react";
import styled from "styled-components";
import type { Position } from "../../types/types";
import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const StyledContainer = styled.div`
  position: relative;
`;

function Image({ children, setPosition, setIsOpen }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleClick = (e: MouseEvent) => {
      const imgRect = img.getBoundingClientRect();
      const x = e.clientX - imgRect.left;
      const y = e.clientY - imgRect.top;
      setPosition({ x, y });
      setIsOpen(true); 
    };

    img.addEventListener("click", handleClick);

    return () => {
      img.removeEventListener("click", handleClick);
    };
  }, [setPosition, setIsOpen]);

  return (
    <StyledContainer>
      {children}
      <img ref={imgRef} src="/yolo.webp" alt="Image" />
    </StyledContainer>
  );
}

export default Image;
