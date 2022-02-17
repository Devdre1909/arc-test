import Arc from "./Arc";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Arc 
          mainStrokeColor="blue"
          secondaryStrokeColor="skyblue"
          width={300}
          height={300}
          strokeWidth={10}
          value={67.3}
        />
      </div>
    </div>
  );
}

export default App;
