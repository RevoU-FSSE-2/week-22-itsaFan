/* eslint-disable react/prop-types */
import { HiBookmark, HiOutlineSelector, HiExclamationCircle } from "react-icons/hi";
import DeleteTodo from "./delete-todo";
import EditTodo from "./edit-todo";
import { useAuth } from "../../context/auth-context";
import Loading from "../UI/loading";
import { timePassed, timeUntil } from "../../utils/timeStamp";
import { formatDateForTodoCard, priorityClassNameColor } from "../../utils/format";
import ExpandableCard from "../UI/expandable-card";
import { motion } from "framer-motion";

export default function TodoItems({ todos, onDelete, loading, onEdit }) {
  const { userPayload } = useAuth();
  const username = userPayload?.username;

  const groupByDate = (todos) => {
    return todos.reduce((acc, todo) => {
      const date = formatDateForTodoCard(todo.createdOn);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(todo);
      return acc;
    }, {});
  };

  const groupedTodos = groupByDate(todos);

  return (
    <motion.div layout className="w-full px-4 py-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-main-dark dark:border-none">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none  text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Todo List </h5>
        <a href={`/${username}/todos`} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          View all
        </a>
      </div>
      {loading ? (
        <div className="flex justify-center my-8">
          <Loading />
        </div>
      ) : (
        <div className="flow-root">
          {todos.length === 0 ? (
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 mb-20">No todo yet, create one!</p>
          ) : (
            Object.keys(groupedTodos)
              .reverse()
              .slice(0, 7)
              .map((date) => (
                <ExpandableCard
                  id={date}
                  key={date}
                  title={date}
                  icon={<HiOutlineSelector size={22} />}
                  cardClassName="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-sub-dark dark:border-none mb-2"
                  titleClassName="font-bold text-lg  bg-clip-text text-gray-900 dark:text-white flex justify-between hover:opacity-80"
                >
                  <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    {groupedTodos[date]
                      .slice(-10)
                      .reverse()
                      .map((todo) => (
                        <li key={todo._id} className="py-3 sm:py-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 text-rose-500">
                              <HiBookmark size={25} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex gap-1">
                                <p className="text-sm font-medium tracking-wide first-letter:uppercase underline text-gray-900 truncate dark:text-white">{todo.title}</p>
                                <HiExclamationCircle size={17} className={priorityClassNameColor(todo.priority)} />
                              </div>

                              <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">{timeUntil(todo.deadline)}</p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">{todo.description}</p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">{timePassed(todo.createdOn)}</p>
                            </div>
                            <div className="inline-flex items-center font-semibold text-gray-900 dark:text-white">
                              <div className="hover:opacity-70">
                                <DeleteTodo todoId={todo._id} onTodoDeleted={onDelete} />
                              </div>
                              <div className="hover:opacity-70">
                                <EditTodo todoId={todo._id} currentTitle={todo.title} currentDescription={todo.description} onEdited={onEdit} />
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </ExpandableCard>
              ))
          )}
        </div>
      )}
    </motion.div>
  );

  // <div className="w-full lg:w-96 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
  //   <div className="flex items-center justify-between mb-4">
  //     <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Todo List</h5>
  //     <a href={`/${username}/todos`} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
  //       View all
  //     </a>
  //   </div>
  //   {loading ? (
  //     <div className="flex justify-center my-8">
  //       <Loading />
  //     </div>
  //   ) : (
  //     <div className="flow-root">
  //       {todos.length === 0 ? (
  //         <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 mb-20">No todo yet, create one!</p>
  //       ) : (
  //         Object.keys(groupedTodos)
  //           .reverse()
  //           .slice(0, 7)
  //           .map((date) => (
  //             <div key={date}>
  //               <h6 className="text-gray-600 dark:text-gray-400 mb-2">{date}</h6>
  //               <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
  //                 {groupedTodos[date].reverse().map((todo) => (
  //                   <li key={todo._id} className="py-3 sm:py-4">
  //                     <div className="flex items-center space-x-4">
  //                       <div className="flex-shrink-0 text-red-700">
  //                         <HiBookmark size={25} />
  //                       </div>
  //                       <div className="flex-1 min-w-0">
  //                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{todo.title}</p>
  //                         <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{timeUntil(todo.deadline)}</p>
  //                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">{todo.description}</p>
  //                         <p className="text-sm text-gray-500 truncate dark:text-gray-400">{timePassed(todo.createdOn)}</p>
  //                       </div>
  //                       <div className="inline-flex items-center font-semibold text-gray-900 dark:text-white">
  //                         <div className="hover:opacity-70">
  //                           <DeleteTodo todoId={todo._id} onTodoDeleted={onDelete} />
  //                         </div>
  //                         <div className="hover:opacity-70">
  //                           <EditTodo todoId={todo._id} currentTitle={todo.title} currentDescription={todo.description} onEdited={onEdit} />
  //                         </div>
  //                       </div>
  //                     </div>
  //                   </li>
  //                 ))}
  //               </ul>
  //             </div>
  //           ))
  //       )}
  //     </div>
  //   )}
  // </div>
}

// (
//   <div className="w-full lg:w-96 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
//     <div className="flex items-center justify-between mb-4">
//       <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Todo List</h5>
//       <a href={`/${username}/todos`} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
//         View all
//       </a>
//     </div>
//     {loading ? (
//       <div className="flex justify-center my-8">
//         <Loading />
//       </div>
//     ) : (
//       <div className="flow-root">
//         {todos.length === 0 ? (
//           <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 mb-20">No todo yet, create one!</p>
//         ) : (
//           <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
//             {todos.slice(-8).reverse().map((todo) => (
//                 <li key={todo._id} className="py-3 sm:py-4">
//                   <div className="flex items-center space-x-4">
//                     <div className="flex-shrink-0 text-red-700">
//                       <HiBookmark size={25} />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{todo.title}</p>
//                       <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{timeUntil(todo.deadline)}</p>
//                       <p className="text-sm text-gray-500 truncate dark:text-gray-400">{todo.description}</p>
//                       <p className="text-sm text-gray-500 truncate dark:text-gray-400">{timePassed(todo.createdOn)}</p>
//                     </div>
//                     <div className="inline-flex items-center font-semibold text-gray-900 dark:text-white ">
//                       <div className="hover:opacity-70">
//                         <DeleteTodo todoId={todo._id} onTodoDeleted={onDelete} />
//                       </div>
//                       <div className="hover:opacity-70">
//                         <EditTodo todoId={todo._id} currentTitle={todo.title} currentDescription={todo.description} onEdited={onEdit} />
//                       </div>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//           </ul>
//         )}
//       </div>
//     )}
//   </div>
// );
