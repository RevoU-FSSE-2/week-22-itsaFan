import { useCallback, useEffect, useState } from "react";
import AddTodo from "../components/todos/add-todo";
import TodoItems from "../components/todos/todo-items";
import { useAuth } from "../context/auth-context";
import { getTodosByCreator } from "../api/todo-api";


export default function DashboardPage() {
  const { accessToken } = useAuth();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTodosByCreator(accessToken);
      setTodos(data.todos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const reFetchTodos = () => {
    fetchTodos();
  };

  return (
    <div className="py-6">
      <div className="flex flex-col lg:flex-row  items-start gap-4 w-92 sm:w-128  lg:w-232">
        <AddTodo onAdd={reFetchTodos} />
        <TodoItems todos={todos} onDelete={reFetchTodos} onEdit={reFetchTodos} loading={loading} />
      </div>
    </div>
  );
}
