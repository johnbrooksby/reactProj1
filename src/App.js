import logo from './logo.svg';
import './App.css';
import Square from './Square'

function App() {
  const name='John'

  return (
    <div className="App">
      <Square propVar={name}/>
    </div>
  );
}

export default App;
