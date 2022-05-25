import { v4 as uuidv4 } from "uuid";
import appReducer from "./redux/reducers";
import { configureStore, Provider } from "./redux";
import Todos from "./Todos";
import Goals from "./Goals";

const todo = {
  id: uuidv4(),
  name: "Learn Redux: complete unit one",
  complete: false
};
const goal = { id: uuidv4(), name: "Learn Spanish before Christmas" };

const store = configureStore({
  initialState: { todos: [todo], goals: [goal] },
  reducer: appReducer
});

export default function App() {
  return (
    <Provider store={store}>
      <div className="p-8">
        <h1 className="text-3xl">Todo's</h1>
        <h2 className="text-xl text-gray-400">
          Typical todo app using a redux built form sratch!
        </h2>
        <Todos />
        <Goals />
      </div>
    </Provider>
  );
}
