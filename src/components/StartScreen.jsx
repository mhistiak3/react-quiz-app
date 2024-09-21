const StartScreen = ({ numQuestions }) => {
  return (
    <div className="start">
      <h1>Welcome to The React Quiz!</h1>
      <h3>{numQuestions} Questions to test your react mastery.</h3>
      <button className="btn btn-ui">Let's Start</button>
    </div>
  );
};
export default StartScreen