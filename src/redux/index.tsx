import React from "react";
import { Action, Reducer, State, Store } from "./types";

function createStore(reducer: Reducer, initialState: State) {
  let state = initialState;
  let listeners: CallableFunction[] = [];
  const getState = () => state;

  const subscribe = (listener: CallableFunction) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action: Action) => {
    state = reducer(state, action);
    listeners.forEach((l) => l(state));
  };

  return {
    getState,
    subscribe,
    dispatch
  };
}

function configureStore({
  initialState,
  reducer
}: {
  initialState: State;
  reducer: Reducer;
}) {
  return createStore(reducer, initialState);
}

const ReduxContext = React.createContext<Store>({
  dispatch: () => () => {},
  getState: () => ({}),
  subscribe: (l: CallableFunction) => () => {}
});

function Provider({
  store,
  children
}: {
  store: Store;
  children: React.ReactNode;
}) {
  return (
    <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
  );
}

function useDispatch() {
  const store = React.useContext(ReduxContext);
  return store.dispatch;
}

function useSelector<T>(cb: (arg: State) => T) {
  const store = React.useContext(ReduxContext);
  let externalState = store.getState();
  type stateType = typeof externalState;

  const [state, setState] = React.useState(externalState);
  store.subscribe((state: stateType) => setState(state));

  let selected = cb(state);
  return selected;
}

export { configureStore, Provider, useSelector, useDispatch };
