import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./constant/constant";
import "./App.css";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import RestaurantPage from "./pages/RestaurantPage";
import UserDetail from "./pages/UserDetail";
import { ToastContainer } from "react-toastify";
import ProductDetails from "./pages/ProductDetails";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";
import { SearchPage } from "./pages/SearchPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CheckoutPage from "./pages/CheckOutPage";
import SuccessfulPayment from "./pages/SuccessfulPayment";
import FailedPayment from "./pages/FailedPayment";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        {/* Redirect to /home by default */}
        <Route path="/" element={<Navigate to={ROUTES.HOME} />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.AUTH} element={<Navigate to={ROUTES.LOGIN} />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.MENU} element={<Menu />} />
        <Route path={ROUTES.SEARCH} element={<SearchPage />} />
        <Route path={ROUTES.RESTAURANT} element={<RestaurantPage />} />
        <Route path={ROUTES.PRODUCT} element={<ProductDetails />} />
        <Route path={ROUTES.CART} element={<Cart />} />
        <Route
          path={ROUTES.USER}
          element={
            <ProtectedRoute>
              <UserDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.CHECKOUT}
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PAYMENT_FAILED}
          element={
            <ProtectedRoute>
              <FailedPayment />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PAYMENT_SUCCESS}
          element={
            <ProtectedRoute>
              <SuccessfulPayment />
            </ProtectedRoute>
          }
        />

        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
      <ToastContainer />
      <Analytics />
    </div>
  );
}

export default App;
