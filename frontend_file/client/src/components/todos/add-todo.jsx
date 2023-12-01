/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useAuth } from "../../context/auth-context";
import AddTodoForm from "../forms/add-todo-form";
import { createTodo } from "../../api/todo-api";
import { Divider, message } from "antd";
import ExpandableCard from "../UI/expandable-card";
// import setHours from 'date-fns/setHours';
// import setMinutes from 'date-fns/setMinutes';

export default function AddTodo({ onAdd }) {
  const { userPayload, accessToken } = useAuth();
  const username = userPayload?.username;
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const [priority, setPriority] = useState("notSet")
  // const priorityRef = useRef(null);
  // const deadlineRef = useRef(null);
  const [deadline, setDeadline] = useState(null);

  const handleAddTodo = async (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    // const priority = priorityRef.current.value;
    // const deadline = deadlineRef.current.value;

    try {
      await createTodo(title, description, priority, deadline, accessToken);
      message.config({
        top: 180,
      });
      message.success("New Todo Added Successfully!");
      if (onAdd) {
        onAdd();
      }
      // console.log(priority)
      titleRef.current.value = "";
      descriptionRef.current.value = "";
      // priorityRef.current.value = "";
      setDeadline(null);
      setPriority("notSet")
      
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <ExpandableCard
      id="add-todo"
      cardClassName="w-full lg:w-128 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-main-dark dark:border-none"
      title={
        <>
          <p className="mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-2xl hover:opacity-80">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500 ">Hello, {username ? username.charAt(0).toUpperCase() + username.slice(1) : ""}</span>
            <br />
            Click me! To Add Task
          </p>
          <Divider className="bg-rose-500 mt-0 " />
        </>
      }
    >
      <AddTodoForm 
        titleRef={titleRef} 
        descriptionRef={descriptionRef} 
        setPriority={setPriority} 
        priority={priority} 
        setDeadline={setDeadline} 
        deadline={deadline} 
        onSubmit={handleAddTodo} />
    </ExpandableCard>
  );
}
