const FinishScore = ({ points, maxPoints, highscore, dispatch }) => {
  const parcentage = (points / maxPoints) * 100;

  let emoji;
  if (parcentage === 100) emoji = "🎖️";
  if (parcentage >= 80 && parcentage < 100) emoji = "🎉";
  if (parcentage >= 50 && parcentage < 80) emoji = "😊";
  if (parcentage > 0 && parcentage < 50) emoji = "🤔";
  if (parcentage === 0) emoji = "😡";

  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(parcentage)}%)
      </p>
      <p className="highscore">Highscore: {highscore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart Quiz
      </button>
    </>
  );
};
export default FinishScore;
