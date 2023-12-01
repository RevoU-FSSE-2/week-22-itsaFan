import { Avatar, Dropdown } from "flowbite-react";
import LogoutBtn from "../UI/logout-btn";
import { useAuth } from "../../context/auth-context";

export default function DropDownNav() {
  const { isLoggedIn, userPayload } = useAuth();
  const username = userPayload?.username;
  const role = userPayload?.role;

  return (
    <Dropdown arrowIcon={false} inline label={<Avatar alt="User settings" rounded />} className="dark:bg-main-dark ">
      {isLoggedIn ? (
        <>
          <Dropdown.Header className="mr-5 ">
            <span className="block text-sm mb-1">Name: {username ? username.charAt(0).toUpperCase() + username.slice(1) : ""}</span>
            <span className="block truncate text-sm font-medium">Role: {role}</span>
          </Dropdown.Header>

          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Privacy</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>
            <LogoutBtn />
          </Dropdown.Item>
        </>
      ) : (
        <>
          <Dropdown.Item href="/login">Login</Dropdown.Item>
          <Dropdown.Item href="/register">Register</Dropdown.Item>
        </>
      )}
    </Dropdown>
  );
}
