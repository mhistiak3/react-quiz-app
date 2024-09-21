import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

const initialState = {
  questions: [],
  status: "loading",
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "active" };
    case "dataFailed":
      return { ...state, status: "error" };

    default:
      throw new Error("Action is unkonwn");
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("./react-questions.json");
        const result = await data.json();
        dispatch({ type: "dataRecived", payload: result.questions });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchData();
  }, []);
  console.log(state);

  return (
    <div className="app">
      <Header />
      <Main>
        <p>1/15</p>
        <p>Question</p>
      </Main>
    </div>
  );
}
