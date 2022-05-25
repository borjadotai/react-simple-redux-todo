import { Todo, Goal, TodoAction, GoalAction } from "./types";
import {
  ADD_GOAL,
  ADD_TODO,
  REMOVE_GOAL,
  REMOVE_TODO,
  TOGGLE_TODO
} from "./constants";

export function addTodoAction(todo: Todo): TodoAction {
  return {
    type: ADD_TODO,
    payload: todo
  };
}

export function addGoalAction(goal: Goal): GoalAction {
  return {
    type: ADD_GOAL,
    payload: goal
  };
}

export function removeGoalAction(id: string): GoalAction {
  return {
    type: REMOVE_GOAL,
    payload: {
      id
    }
  };
}

export function removeTodoAction(id: string): TodoAction {
  return {
    type: REMOVE_TODO,
    payload: {
      id
    }
  };
}

export function toggleTodoAction(id: string): TodoAction {
  return {
    type: TOGGLE_TODO,
    payload: {
      id
    }
  };
}
