import { NavLink } from "react-router";

function Header() {
  return (
    <header>
      <h1>photo-tagging-app</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/game">Game</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
