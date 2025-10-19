import { Outlet } from "react-router";
import Header from "./components/organisms/Header";

export default function Root() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
