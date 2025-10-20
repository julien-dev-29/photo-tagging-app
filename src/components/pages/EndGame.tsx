import { useState, type FormEvent } from "react";
import styled from "styled-components";
import { Alert } from "../organisms/Alert";
import { useNavigate } from "react-router";

type Props = {
  totalSeconds: number;
};
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  & :nth-child(1) {
    color: #8e4ec6;
    margin-right: 25px;
  }
`;

const StyledForm = styled.form`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledLabel = styled.label``;

const StyledInput = styled.input`
  padding: 8px 12px;
  background-color: #0d2d2a;
  color: #0bd8b6;
  border-radius: 5px;
  border: 1px solid #145750;
`;

const StyledButton = styled.button`
  margin-top: 24px;
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  background: #0d2d2a;
  color: #0bd8b6;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 6px 6px 12px #091d1b, -6px -6px 12px #123f3a;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 4px 4px 8px #091d1b, -4px -4px 8px #123f3a;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: inset 4px 4px 8px #091d1b, inset -4px -4px 8px #123f3a;
    transform: translateY(0);
  }
`;

function EndGame({ totalSeconds }: Props) {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/record", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ name: name, score: totalSeconds }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      navigate("/");
    } catch (error) {
      setError(error as string);
    }
  };
  return (
    <Container>
      {error.length > 0 && <Alert alertType="Fail!" setAlertType={() => {}} />}
      <FlexDiv>
        <h1>You win!</h1>
        <div>Votre Score</div>
        <div>{minutes.toString().padStart(2, "0")}</div>
        <div>:</div>
        <div>{seconds.toString().padStart(2, "0")}</div>{" "}
      </FlexDiv>
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel htmlFor="username">Enter your name</StyledLabel>
        <StyledInput
          type="text"
          id="username"
          name="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <StyledButton type="submit">Enter</StyledButton>
      </StyledForm>
    </Container>
  );
}

export default EndGame;
