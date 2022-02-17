import Arc from "./Arc";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Arc 
          mainStrokeColor="blue"
          secondaryStrokeColor="skyblue"
          width={500}
          height={500}
          strokeWidth={10}
          value={67.9}
        />
      </div>
    </div>
  );
}

export default App;
