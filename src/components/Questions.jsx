const Questions = ({ question, dispatch, answer }) => {
  const hasAns = answer !== null;
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question?.options.map((option, index) => (
          <button
            key={index}
            disabled={answer ? true : false}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAns
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            onClick={() =>
              dispatch({ type: "newAnswer", payload: index,})
            }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Questions;
