const Progress = ({
  numQuestions,
  currentQIndex,
  points,
  maxPoints,
  answer,
}) => {
    
  return (
    <header className="progress">
      <progress max={numQuestions} value={currentQIndex + Number(answer !== null)}></progress>
      <p>
        Question: <strong>{currentQIndex + 1}</strong> / {numQuestions}
      </p>

      <p>
        Points: <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
};
export default Progress;
