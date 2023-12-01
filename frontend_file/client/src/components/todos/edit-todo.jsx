/* eslint-disable react/prop-types */
import { Card, Modal } from "flowbite-react";
import { useRef, useState } from "react";
import { HiPencilAlt } from "react-icons/hi";
import EditTodoForm from "../forms/edit-todo-form";
import { editTodo } from "../../api/todo-api";
import { useAuth } from "../../context/auth-context";
import { message } from "antd";

export default function EditTodo({ todoId, currentTitle, currentDescription, onEdited }) {
  const [openModal, setOpenModal] = useState();
  const { accessToken } = useAuth();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const [priority, setPriority] = useState(null);
  const [deadline, setDeadline] = useState(null);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const title = titleRef.current.value;
      const description = descriptionRef.current.value;
      await editTodo(todoId, title, description, priority, deadline ,accessToken);
      setOpenModal(undefined);
      message.config({
        top: 100,
      });
      message.success("Edit Success!");
      if (onEdited) {
        onEdited();
      }
    } catch (error) {
      console.error("Failed to edit todo:", error);
    }
  };

  return (
    <>
      <button onClick={() => setOpenModal("default")}>
        <HiPencilAlt size={25} />
      </button>
      <Modal show={openModal === "default"} className="pt-16" size="sm" position="top-center" onClose={() => setOpenModal(undefined)} initialFocus={titleRef} popup>
        <Card>
          <Modal.Header className="-ml-2">Edit Todo</Modal.Header>
          <EditTodoForm 
            onSubmit={handleEdit} 
            titleRef={titleRef} 
            descriptionRef={descriptionRef}
            setPriority={setPriority} 
            priority={priority} 
            setDeadline={setDeadline} 
            deadline={deadline} 
            defaultTitle={currentTitle} 
            defaultDescription={currentDescription} />
        </Card>
      </Modal>
    </>
  );
}
