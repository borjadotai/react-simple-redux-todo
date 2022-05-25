import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "./redux";
import RemoveButton from "./components/RemoveButton";
import {
  addTodoAction,
  removeTodoAction,
  toggleTodoAction
} from "./redux/actions";

export default function Todos() {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = React.useState("");
  const todos = useSelector((state) => state.todos);

  function addNewTodo(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(
      addTodoAction({
        name: newTodo,
        id: uuidv4()
      })
    );
    setNewTodo("");
  }

  return (
    <div className="mt-4 p-4 w-100 bg-neutral-900 rounded-md">
      <p className="font-bold">Todos:</p>
      <ul>
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="-mx-1 px-1 my-2 flex justify-between text-gray-300 rounded-sm hover:bg-neutral-800"
          >
            <span>
              <input
                id={todo.name}
                type="checkbox"
                name={todo.name}
                value={todo.name}
                checked={todo.complete}
                onChange={() => dispatch(toggleTodoAction(todo.id))}
              />
              <label className="ml-2 cursor-pointer" htmlFor={todo.name}>
                {todo.name}
              </label>
            </span>
            <RemoveButton onClick={() => dispatch(removeTodoAction(todo.id))} />
          </li>
        ))}
      </ul>
      <form className="flex w-full justify-between text-neutral-500">
        <input
          type="text"
          value={newTodo}
          placeholder="Add new todo..."
          className="outline-none bg-transparent placeholder:text-neutral-600"
          onChange={(e) => setNewTodo(e.currentTarget.value)}
        />
        <button type="submit" onClick={addNewTodo} className="cursor-pointer">
          Add
        </button>
      </form>
    </div>
  );
}
