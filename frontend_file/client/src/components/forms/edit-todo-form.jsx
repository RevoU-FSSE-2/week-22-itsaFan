/* eslint-disable react/prop-types */
import { Button, Label, TextInput } from "flowbite-react";
import RadioBtn from "../UI/radio-btn";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function EditTodoForm({ onSubmit, titleRef, descriptionRef, priority, setPriority, setDeadline, deadline, defaultTitle, defaultDescription }) {
  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Edit Your Todo" />
        </div>
        <TextInput color="info" placeholder="Plan" name="title" id="title" ref={titleRef} defaultValue={defaultTitle} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Edit Your Description" />
        </div>
        <TextInput color="info" placeholder="Details" name="description" id="description" ref={descriptionRef} defaultValue={defaultDescription} />
      </div>

      <div>
        <div className="mb-2 text-gray-900 dark:text-dark-text font-medium text-md">
          <p>Set Priority (optional)</p>
        </div>
        <div className="flex flex-wrap ">
          <RadioBtn
            id="low"
            labelFor="low"
            value="low"
            checked={priority === 'low'}
            onChange={(e) => setPriority(e.target.value)}
            title="Low"
            className="w-4 h-4 text-green-500 focus:ring-green-400 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <RadioBtn
            id="medium"
            labelFor="medium"
            value="medium"
            checked={priority === 'medium'}
            onChange={(e) => setPriority(e.target.value)}
            title="Medium"
            className="w-4 h-4 text-yellow-400 focus:ring-yellow-300 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <RadioBtn
            id="high"
            labelFor="high"
            value="high"
            checked={priority === 'high'}
            onChange={(e) => setPriority(e.target.value)}
            title="High"
            className="w-4 h-4 text-red-600 focus:ring-red-500 bg-gray-100 border-gray-300  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      <div className="flex">
        <div className="relative w-full">
          <DatePicker
            name="deadline"    
            autoComplete="off"
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            timeInputLabel="Time:"
            dateFormat="MM/dd/yyyy h:mm aa"
            showTimeInput
            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg "
            placeholderText="Set Deadline (optional)"
            isClearable
          />
        </div>
      </div>

      <div className="flex gap-2 mt-5">
        <Button type="submit" gradientDuoTone="pinkToOrange" outline>
          Edit
        </Button>
      </div>
    </form>
  );
}
