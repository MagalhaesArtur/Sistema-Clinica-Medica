import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./main.css";
import LoginPage from "./pages/LoginPage.tsx";
import SingUpPage from "./pages/SingUpPage.tsx";
import UserHomePage from "./pages/UserHomePage.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { RequireAuth } from "./context/RequireAuth.tsx";
import ScreenRouter from "./utils/ScreenRouter.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthProvider>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SingUpPage />} />

          <Route
            path="/home"
            element={
              <RequireAuth>
                <UserHomePage />
              </RequireAuth>
            }
          >
            <Route path="/home" element={<ScreenRouter />}></Route>
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  </AuthProvider>
);
