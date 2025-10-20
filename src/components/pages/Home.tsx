import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import styled from "styled-components";
import { Alert } from "../organisms/Alert";

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledH1 = styled.h1`
  margin-top: 35px;
`;

const StyledNavLink = styled(NavLink)`
  border-radius: 5px;
  padding: 16px;
  background-color: #12a594;
  text-decoration: none;
  color: white;
  transition: transform 100ms;
  &:hover {
    background-color: #0eb39e;
    color: white;
  }
  &:active {
    transform: scale(0.98);
    background-color: #12a594;
  }
`;

type User = {
  id: number;
  name: string;
  score: number;
};

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:3000/records");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setUsers(data.users);
        setIsLoading(false);
      } catch (error) {
        setError(error as string);
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <StyledContainer>
      {error.length > 0 && <Alert alertType="Fail!" setAlertType={() => {}} />}
      <StyledH1>Photo Tag App</StyledH1>
      <StyledNavLink to="/game">Start the Game</StyledNavLink>
      {users.map((u) => (
        <div key={u.id}>
          <div>{u.name}</div>
          <div>{u.score}</div>
        </div>
      ))}
    </StyledContainer>
  );
}

export default Home;
