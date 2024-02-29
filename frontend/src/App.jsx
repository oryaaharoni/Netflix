import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignInPage from "./pages/signInPage/SigninPage.jsx";
import SignUpPage from "./pages/signUpPage/SignUpPage.jsx";
import HomePage from "./pages/homePage/HomePage.jsx";
import LoginHelpPage from "./pages/signInPage/LoginHelpPage.jsx";
import ResetPwdPage from "./pages/resetPage/ResetPwdPage.jsx";
import DescriptionPage from "./pages/descriptionPage/DescriptionPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/forgotPwd" element={<LoginHelpPage />} />
        <Route path="/resetPwd" element={<ResetPwdPage />} />
        <Route path="/info" element={<DescriptionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
