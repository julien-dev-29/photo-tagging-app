import { useEffect, useRef, useState } from "react";
import { Modal } from "../organisms/Modal";

function Game() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && modalRef.current.contains(e.target as Node)) {
        return;
      }
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
      setIsOpen((prev) => !prev);
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div>
      <h1>Game</h1>
      <Modal isOpen={isOpen} position={position}></Modal>
    </div>
  );
}

export default Game;
