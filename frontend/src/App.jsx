import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/signInPage/SignInPage.jsx";
import SignUpPage from "./pages/signUpPage/SignUpPage.jsx";
import HomePage from "./pages/homePage/HomePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/homePage" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
