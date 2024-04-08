function lowerLetters(text: string) {
  return text.toLowerCase();
}

function App() {
  return (
    <>
      <h1>{lowerLetters("Hello World!")}</h1>
    </>
  );
}

export default App;
