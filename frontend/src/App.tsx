import { Routes, Route } from "react-router-dom";
import Overview from "./pages/Doctor/Overview";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/overview" element={<Overview />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
