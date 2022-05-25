import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "./redux";
import RemoveButton from "./components/RemoveButton";
import { addGoalAction, removeGoalAction } from "./redux/actions";

export default function Goals() {
  const dispatch = useDispatch();
  const [newGoal, setNewGoal] = React.useState("");
  const goals = useSelector((state) => state.goals);

  function addNewGoal(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(
      addGoalAction({
        name: newGoal,
        id: uuidv4()
      })
    );
    setNewGoal("");
  }

  return (
    <div className="mt-4 p-4 w-100 bg-neutral-900 rounded-md">
      <p className="font-bold">Goals:</p>
      <ul>
        {goals?.map((goal) => (
          <li
            key={goal.id}
            className="-mx-1 px-1 my-2 flex justify-between rounded-sm text-gray-300 hover:bg-neutral-800"
          >
            {goal.name}
            <RemoveButton onClick={() => dispatch(removeGoalAction(goal.id))} />
          </li>
        ))}
      </ul>
      <form className="flex w-full justify-between text-neutral-500">
        <input
          type="text"
          value={newGoal}
          placeholder="Add new goal..."
          className="outline-none bg-transparent placeholder:text-neutral-600"
          onChange={(e) => setNewGoal(e.currentTarget.value)}
        />
        <button
          onClick={addNewGoal}
          className="cursor-pointer"
          disabled={newGoal.length < 1}
        >
          Add
        </button>
      </form>
    </div>
  );
}
