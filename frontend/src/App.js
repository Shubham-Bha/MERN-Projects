import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Correct path to the bootstrap JS
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./screen/Home";
import Login from "./screen/Login";
import SignUp from "./screen/SignUp";
import { CartProvider } from "./components/ContextReducer";
import MyOrder from "./screen/MyOrder";


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myOrder" element={<MyOrder/>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
