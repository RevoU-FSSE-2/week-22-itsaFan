import { useCallback, useEffect, useState } from "react";
import AllTodo from "../components/todos/all-todos";
import { useAuth } from "../context/auth-context";
import { getAllTodos, getTodosByCreator } from "../api/todo-api";
import SearchTodoForm from "../components/forms/search-todo-form";
import classes from "./css/alltodos.module.css";
import { Card } from "flowbite-react";

export default function AllTodosPage() {
  const { accessToken, userPayload } = useAuth();
  const [todos, setTodos] = useState([]);
  const role = userPayload?.role;
  const [loading, setLoading] = useState(false);

  // console.log(role);

  const fetchTodos = useCallback(async () => {
    setLoading(true);

    if (!role) {
      return;
    }

    try {
      let data;

      if (role === "ROLE_ADMIN") {
        data = await getAllTodos(accessToken);
      } else if (role === "ROLE_USER") {
        data = await getTodosByCreator(accessToken);
      } else {
        console.error("Unexpected role:", role);
        return;
      }
      setTodos(data.todos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  }, [accessToken, role]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const reFetchAllTodos = () => {
    fetchTodos();
  };

  return (
    <div className={classes.container}>
      <div className="flex flex-col mt-4 lg:mx-48 md:mx-7 mx-2">
        <Card  className="dark:bg-main-dark dark:border-none">
          <SearchTodoForm setLoading={setLoading} setTodos={setTodos} reFetch={reFetchAllTodos} />
          <AllTodo todos={todos} loading={loading} onDelete={reFetchAllTodos} onEdit={reFetchAllTodos} />
        </Card>
      </div>
    </div>
  );
}
