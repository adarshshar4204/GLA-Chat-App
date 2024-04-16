import "./App.css";

import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LogIn";
import DashBoard from "./components/DashBoard";

function App() {
  const mainAppStyle = {
    backgroundColor: "lightGreen",
    height: "100%",
    width: "100%",
  };

  return (
    <div className="App" style={mainAppStyle}>
      <BrowserRouter>
        {/* <Router > */}
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/SignUp" index element={<SignUp />} />
          <Route path="/user-space" element={<DashBoard />} />
        </Routes>
        {/* </Router> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
