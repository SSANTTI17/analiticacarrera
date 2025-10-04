import "./App.css";
import Dashboard from "./components/Dashboard";
import { sampleCourses } from "./sampleData";

function App() {
  // Static: use sample data only
  return (
    <div className="app-root">
      <Dashboard courses={sampleCourses} />
    </div>
  );
}

export default App;
