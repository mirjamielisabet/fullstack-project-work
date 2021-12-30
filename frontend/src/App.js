import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MainComponent } from "./components/MainComponent";
import { UserComponent } from "./components/UserComponent";
import { AdminComponent } from "./components/AdminComponent";
import { NavigationBar } from "./components/NavigationComponent";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/user" element={<UserComponent />} />
        <Route path="/teacher" element={<AdminComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
