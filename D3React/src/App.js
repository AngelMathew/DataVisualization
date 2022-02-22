import './App.css';
import LineChart from './components/LineChart/LineChart';
import ScatterPlot from './components/ScatterPlot/ScatterPlot';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <section>
      <LineChart/>
      </section>
      <section>
      <ScatterPlot/>
      </section>
    </div>
  );
}

export default App;
