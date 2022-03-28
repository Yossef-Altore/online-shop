import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MarketPage from "./pages/MarketPage";
import PaymentAndDelivery from "./pages/PaymentAndDelivery";

function App() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="admin" element={<Admin />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route
        path="market"
        element={
          loggedIn === true ? <MarketPage /> : <Navigate replace to="/login" />
        }
      />
      <Route
        path="paymentAndDelivery"
        element={
          loggedIn === true ? (
            <PaymentAndDelivery />
          ) : (
            <Navigate replace to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
