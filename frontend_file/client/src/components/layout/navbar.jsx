import { Navbar as FlowNav } from "flowbite-react";
import { logo } from "../../assets";
import DropDownNav from "./dropdown-nav";
import ThemeToggle from "../UI/theme-toggle";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

export default function Navbar() {
  const location = useLocation();
  const { isLoggedIn, userPayload } = useAuth();
  const isAdmin = userPayload?.role === "ROLE_ADMIN";
  const username = userPayload?.username;

  return (
    <FlowNav fluid className="shadow dark:bg-main-dark">
      <FlowNav.Brand href="#">
        <img src={logo} alt="logo" width={120} height={30} />
      </FlowNav.Brand>
      <div className="flex md:order-2 gap-5">
        <ThemeToggle />
        <DropDownNav />
        <FlowNav.Toggle />
      </div>
      <FlowNav.Collapse>
        <FlowNav.Link className="text-base" href="/" active={location.pathname === "/"}>
          Home
        </FlowNav.Link>
        {isLoggedIn && (
          <>
            <FlowNav.Link className="text-base" href="/dashboard" active={location.pathname === "/dashboard"}>
              Dashboard
            </FlowNav.Link>
            <FlowNav.Link className="text-base" href={`/${username}/todos`} active={location.pathname === `/${username}/todos`}>
              {isAdmin ? "All Todos" : "My Todos"}
            </FlowNav.Link>
          </>
        )}
        <FlowNav.Link className="text-base" href="#">
          Contact
        </FlowNav.Link>
      </FlowNav.Collapse>
    </FlowNav>
  );
}

{
  /* <FlowNav.Link className="text-base" href="/register" active={location.pathname === "/register"}>
          Register
        </FlowNav.Link>
        <FlowNav.Link className="text-base" href="/login">
          Log in <span aria-hidden="true">&rarr;</span>
        </FlowNav.Link> */
}
