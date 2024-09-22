import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";

const initialState = {
  questions: [],
  status: "loading",
  currentQIndex: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const point =
        state.questions[state.currentQIndex].correctOption === action.payload
          ? state.questions[state.currentQIndex].points
          : 0;
      return {
        ...state,
        answer: action.payload,
        points: (state.points + point),
      };

    default:
      throw new Error("Action is unkonwn");
  }
}
export default function App() {
  const [{ questions, status, currentQIndex, answer,points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  console.log(points);
  
  let numQuestions = questions.length;
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
  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Questions
            dispatch={dispatch}
            question={questions[currentQIndex]}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}
