import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import Progress from "./components/Progress";
import FinishScore from "./components/FinishScore";

const initialState = {
  questions: [],
  status: "loading",
  currentQIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
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
        points: state.points + point,
      };
    case "nextQuestion":
      return { ...state, currentQIndex: state.currentQIndex + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "reset":
      return {
        ...state,
        status: "ready",
        currentQIndex: 0,
        answer: null,
        points: 0,
      };

    default:
      throw Error("Action is unkonwn");
  }
}
export default function App() {
  const [
    { questions, status, currentQIndex, answer, points, highscore },
    dispatch,
  ] = useReducer(reducer, initialState);

  let numQuestions = questions.length;
  let maxPoints = questions.reduce((acc, question) => question.points + acc, 0);

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
          <>
            <Progress
              currentQIndex={currentQIndex}
              points={points}
              numQuestions={numQuestions}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Questions
              dispatch={dispatch}
              question={questions[currentQIndex]}
              answer={answer}
            />
            {answer !== null ? (
              currentQIndex === numQuestions - 1 ? (
                <button
                  className="btn btn-ui"
                  onClick={() => dispatch({ type: "finish" })}
                >
                  Finish Quiz
                </button>
              ) : (
                <button
                  className="btn btn-ui"
                  onClick={() => dispatch({ type: "nextQuestion" })}
                >
                  Next Question
                </button>
              )
            ) : (
              ""
            )}
          </>
        )}
        {status === "finished" && (
          <FinishScore
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
