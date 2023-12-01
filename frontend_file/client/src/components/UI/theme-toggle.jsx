import { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    // document.documentElement.classList.toggle("dark", newTheme === "dark");
    document.body.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      //   document.documentElement.classList.toggle("dark", savedTheme === "dark");
      document.body.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  return (
    <button className="shadow-lg px-2 my-1 rounded-xl bg-slate-300 dark:bg-sub-dark hover:opacity-50" type="button" onClick={toggleTheme}>
      {theme === "dark" ? <HiMoon color="white" /> : <HiSun />}
    </button>
  );
}
