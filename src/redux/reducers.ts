import { v4 as uuidv4 } from "uuid";
import { Action, Goal, GoalAction, State, Todo, TodoAction } from "./types";

/*
  Pure functions
  1) Always return the same result if the same args are passed in
  2) They depends only on the args passed into them
  3) Never produce any side effects
*/

function todosReducer(state: Todo[] = [], action: TodoAction) {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TODO":
      return [...state, { ...payload, id: uuidv4() }];
    case "REMOVE_TODO":
      return state.filter(({ id }) => id !== payload.id);
    case "TOGGLE_TODO":
      return state.map((todo) =>
        payload.id === todo.id ? { ...todo, complete: !todo.complete } : todo
      );
    default:
      return state;
  }
}

function goalsReducer(state: Goal[] = [], action: GoalAction): Goal[] {
  const { type, payload } = action;

  switch (type) {
    case "ADD_GOAL":
      return [...state, { ...payload, id: uuidv4() }];
    case "REMOVE_GOAL":
      return state.filter(({ id }) => id !== payload.id);
    default:
      return state;
  }
}

export default function appReducer(
  state: State = { todos: [], goals: [] },
  action: Action
): State {
  return {
    todos: todosReducer(state.todos, action as TodoAction),
    goals: goalsReducer(state.goals, action as GoalAction)
  };
}
