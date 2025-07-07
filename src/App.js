import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./HTML/Index";
import Watch_screen from "./HTML/Watch_screen";
import "./App.css";

function App() {
  const numberOfStopwatches = 1;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Index" element={<Index />} />
        <Route
          path="/Watch_screen"
          element={
            <div>
              {[...Array(numberOfStopwatches)].map((_, index) => (
                <Watch_screen key={index} index={index} />
              ))}
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
