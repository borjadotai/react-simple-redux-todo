export type State = { todos?: Todo[]; goals?: Goal[] };

export type Todo = {
  id: string;
  name?: string;
  complete?: boolean;
};

export type Goal = {
  id: string;
  name?: string;
};

export type TodoActionType = "ADD_TODO" | "REMOVE_TODO" | "TOGGLE_TODO";

export type GoalActionType = "ADD_GOAL" | "REMOVE_GOAL";

export type TodoAction = {
  type: TodoActionType;
  payload: Todo;
};

export type GoalAction = {
  type: GoalActionType;
  payload: Goal;
};

export type Action = TodoAction | GoalAction;

export type Reducer = (state: State, action: Action) => State;

export type Store = {
  getState: () => State;
  subscribe: (listener: CallableFunction) => () => void;
  dispatch: (action: Action) => void;
};

export type ProviderProps = { store: Store; children: React.ReactNode };
