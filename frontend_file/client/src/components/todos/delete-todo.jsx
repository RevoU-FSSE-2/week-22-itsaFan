/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { message } from "antd";
import { HiTrash } from "react-icons/hi";
import { useAuth } from "../../context/auth-context";
import { deleteTodo } from "../../api/todo-api";

export default function DeleteTodo({ todoId, onTodoDeleted }) {
  const { accessToken } = useAuth();

  const handleDeleteTodo = async () => {
    try {
      await deleteTodo(todoId, accessToken);
      message.config({
        top: 100,
      });
      message.success("Todo Delete Success!");
      
      if (onTodoDeleted) {
        onTodoDeleted();
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <button type="submit" onClick={handleDeleteTodo}>
      <HiTrash size={25} />
    </button>
  );
}
